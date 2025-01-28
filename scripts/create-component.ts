#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

interface ComponentOptions {
  name: string
  variants?: string[]
  sizes?: string[]
  hasIcon?: boolean
  isInteractive?: boolean
}

// Parse command line arguments
const args = process.argv.slice(2)
const options: ComponentOptions = {
  name: args[0],
  variants: args.includes('--variants')
    ? args[args.indexOf('--variants') + 1]?.split(',')
    : ['default'],
  sizes: args.includes('--sizes') ? args[args.indexOf('--sizes') + 1]?.split(',') : undefined,
  hasIcon: args.includes('--with-icon'),
  isInteractive: args.includes('--interactive'),
}

if (!options.name) {
  console.error('Please provide a component name')
  console.log('\nUsage: pnpm create-component ComponentName [options]')
  console.log('\nOptions:')
  console.log('  --variants primary,secondary,outline    Add variant support')
  console.log('  --sizes sm,md,lg                       Add size support')
  console.log('  --with-icon                            Add icon support')
  console.log('  --interactive                          Add keyboard interaction support')
  process.exit(1)
}

const componentDir = join('src', 'components', options.name)
mkdirSync(componentDir, { recursive: true })

// Generate types based on options
const generatePropTypes = (options: ComponentOptions) => {
  const types = ['className?: string']

  if (options.variants?.length) {
    types.push(`variant?: ${options.variants.map(v => `'${v}'`).join(' | ')}`)
  }

  if (options.sizes?.length) {
    types.push(`size?: ${options.sizes.map(s => `'${s}'`).join(' | ')}`)
  }

  if (options.hasIcon) {
    types.push('icon?: React.ReactNode')
  }

  if (options.isInteractive) {
    types.push('onClick?: (event: React.MouseEvent<HTMLElement>) => void')
    types.push('disabled?: boolean')
    types.push('aria-label?: string')
  }

  return types.join(';\n  ')
}

// Generate style objects based on options
const generateStyles = (options: ComponentOptions) => {
  const styles = ["const baseStyles = 'rounded-md transition-colors'"]

  if (options.variants?.length) {
    styles.push(`const variantStyles = {
    ${options.variants.map(v => `'${v}': 'bg-${v === 'primary' ? 'blue' : v === 'secondary' ? 'gray' : 'transparent'}-${v === 'outline' ? '50' : '600'} text-${v === 'outline' ? 'blue-600' : 'white'}'`).join(',\n    ')}
  }`)
  }

  if (options.sizes?.length) {
    styles.push(`const sizeStyles = {
    ${options.sizes.map(s => `'${s}': 'px-${s === 'sm' ? '3' : s === 'md' ? '4' : '6'} py-${s === 'sm' ? '1.5' : s === 'md' ? '2' : '3'} text-${s === 'sm' ? 'sm' : s === 'md' ? 'base' : 'lg'}'`).join(',\n    ')}
  }`)
  }

  return styles.join(';\n\n  ')
}

// Component Template
const componentTemplate = `import { forwardRef } from 'react';

export interface ${options.name}Props {
  ${generatePropTypes(options)}
}

const ${options.name} = forwardRef<HTMLElement, ${options.name}Props>(
  ({
    className = '',
    ${options.variants?.length ? "variant = 'default'," : ''}
    ${options.sizes?.length ? "size = 'md'," : ''}
    ${options.hasIcon ? 'icon,' : ''}
    ${options.isInteractive ? 'onClick,' : ''}
    ${options.isInteractive ? 'disabled = false,' : ''}
    ...props
  }, ref) => {
    ${generateStyles(options)}

    const classes = [
      baseStyles,
      ${options.variants?.length ? 'variantStyles[variant],' : ''}
      ${options.sizes?.length ? 'sizeStyles[size],' : ''}
      ${options.isInteractive ? 'disabled && "opacity-50 cursor-not-allowed",' : ''}
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        ${options.isInteractive ? 'onClick={!disabled ? onClick : undefined}' : ''}
        ${options.isInteractive ? 'role="button"' : ''}
        ${options.isInteractive ? 'tabIndex={disabled ? -1 : 0}' : ''}
        ${options.isInteractive ? 'aria-disabled={disabled}' : ''}
        {...props}
      >
        ${options.hasIcon ? `{icon && <span className="mr-2">{icon}</span>}` : ''}
        {props.children}
      </div>
    );
  }
);

${options.name}.displayName = '${options.name}';

export default ${options.name};
`

// Story Template
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react';
${options.hasIcon ? "import { ArrowRightIcon } from '@heroicons/react/24/outline';" : ''}
import ${options.name} from './${options.name}';

const meta: Meta<typeof ${options.name}> = {
  title: 'Components/${options.name}',
  component: ${options.name},
  tags: ['autodocs'],
  argTypes: {
    ${
      options.variants?.length
        ? `variant: {
      options: [${options.variants.map(v => `'${v}'`).join(', ')}],
      control: { type: 'select' }
    },`
        : ''
    }
    ${
      options.sizes?.length
        ? `size: {
      options: [${options.sizes.map(s => `'${s}'`).join(', ')}],
      control: { type: 'select' }
    },`
        : ''
    }
  }
};

export default meta;
type Story = StoryObj<typeof ${options.name}>;

export const Default: Story = {
  args: {
    children: '${options.name} Content',
    ${options.hasIcon ? "icon: <ArrowRightIcon className='w-4 h-4' />," : ''}
  },
};

${options.variants
  ?.map(
    variant => `
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    ...Default.args,
    variant: '${variant}',
  },
};`
  )
  .join('\n')}
`

// Test Template
const testTemplate = `import { render, screen${options.isInteractive ? ', fireEvent' : ''} } from '@testing-library/react';
import ${options.name} from './${options.name}';

describe('${options.name}', () => {
  it('renders without crashing', () => {
    render(<${options.name}>Test Content</${options.name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  ${
    options.variants?.length
      ? `
  it('applies variant styles correctly', () => {
    const { rerender } = render(<${options.name}>Test</${options.name}>);
    ${options.variants
      .map(
        variant => `
    rerender(<${options.name} variant="${variant}">Test</${options.name}>);
    expect(screen.getByText('Test')).toHaveClass('bg-${variant === 'primary' ? 'blue' : variant === 'secondary' ? 'gray' : 'transparent'}-${variant === 'outline' ? '50' : '600'}');
    `
      )
      .join('\n    ')}
  });`
      : ''
  }

  ${
    options.isInteractive
      ? `
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<${options.name} onClick={handleClick}>Click me</${options.name}>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('respects disabled state', () => {
    const handleClick = vi.fn();
    render(<${options.name} onClick={handleClick} disabled>Click me</${options.name}>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });`
      : ''
  }
});
`

// Index Template
const indexTemplate = `export { default } from './${options.name}';
export type { ${options.name}Props } from './${options.name}';
`

// E2E Test Template
const e2eTemplate = `import { test, expect } from '@playwright/test';
import {
  getStoryFrame,
  goToStory,
  testAccessibility,
  testKeyboardAccessibility,
} from '../test-utils';

const COMPONENT = '${options.name.toLowerCase()}';
const VARIANTS = ${JSON.stringify(options.variants)};

test.beforeEach(async ({ page }) => {
  await goToStory(page, COMPONENT, 'default');
});

test('renders correctly', async ({ page }) => {
  const frame = getStoryFrame(page);
  await expect(frame.getByRole(${options.isInteractive ? "'button'" : "'generic'"}, { name: '${options.name} Content' })).toBeVisible();
});

${
  options.variants?.length
    ? `
test('applies variant styles correctly', async ({ page }) => {
  for (const variant of VARIANTS) {
    const frame = await goToStory(page, COMPONENT, variant);
    const element = frame.getByRole(${options.isInteractive ? "'button'" : "'generic'"});
    await expect(element).toHaveClass(new RegExp(\`bg-\${variant === 'primary' ? 'blue' : variant === 'secondary' ? 'gray' : 'transparent'}-\${variant === 'outline' ? '50' : '600'}\`));
  }
});`
    : ''
}

test('has no accessibility violations', async ({ page }) => {
  await testAccessibility(page, COMPONENT, VARIANTS);
});

${
  options.isInteractive
    ? `
test('is keyboard accessible', async ({ page }) => {
  const frame = getStoryFrame(page);
  await testKeyboardAccessibility(page, frame, {
    role: 'button',
    name: '${options.name} Content'
  });
});`
    : ''
}
`

// Write files
writeFileSync(join(componentDir, `${options.name}.tsx`), componentTemplate)
writeFileSync(join(componentDir, `${options.name}.stories.tsx`), storyTemplate)
writeFileSync(join(componentDir, `${options.name}.test.tsx`), testTemplate)
writeFileSync(join(componentDir, 'index.ts'), indexTemplate)
writeFileSync(join('e2e', `${options.name.toLowerCase()}.spec.ts`), e2eTemplate)

console.log(`✨ Created ${options.name} component with all required files!`)
console.log('\nComponent features:')
if (options.variants?.length) console.log(`- Variants: ${options.variants.join(', ')}`)
if (options.sizes?.length) console.log(`- Sizes: ${options.sizes.join(', ')}`)
if (options.hasIcon) console.log('- Icon support')
if (options.isInteractive) console.log('- Interactive with keyboard support')

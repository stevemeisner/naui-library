# Contributing to the UI Library

## Development Setup

1. Clone the repository:

```bash
git clone https://github.com/your-org/ui-library.git
cd ui-library
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development environment:

```bash
pnpm dev
```

## Project Structure

```
src/
├── components/        # React components
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.test.tsx
│       ├── ComponentName.stories.tsx
│       └── index.ts
├── theme/            # Theming system
│   ├── ThemeProvider.tsx
│   └── index.ts
├── utils/           # Utility functions
├── styles/          # Global styles
└── test/            # Test utilities
```

## Component Development Guidelines

1. **File Structure**

   - Each component should be in its own directory
   - Include component, test, stories, and index files
   - Follow TypeScript strict mode
   - Implement proper ARIA attributes

2. **Testing Requirements**

   - Unit tests with React Testing Library
   - E2E tests with Playwright
   - Accessibility tests with axe-core
   - Visual regression tests where applicable

3. **Theming Integration**
   - Use CSS variables for themeable properties
   - Access theme values through the `useTheme` hook
   - Support all color variants (50-950)
   - Include proper fallbacks

## Creating a New Component

1. Use the component generator:

```bash
pnpm create-component ComponentName
```

2. Implement the component following the template:

```tsx
import { cn } from '../../utils';
import { useTheme } from '../../theme';

export interface ComponentNameProps {
  // Props...
}

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>((props, ref) => {
  const theme = useTheme();

  return (
    // Component JSX...
  );
});

ComponentName.displayName = 'ComponentName';
```

3. Add tests:

```tsx
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'
import { ThemeProvider } from '../../theme'

describe('ComponentName', () => {
  it('renders with default theme', () => {
    render(
      <ThemeProvider>
        <ComponentName />
      </ThemeProvider>
    )
  })

  it('applies custom theme', () => {
    const theme = {
      colors: {
        primary: {
          500: '100 200 300',
        },
      },
    }

    render(
      <ThemeProvider theme={theme}>
        <ComponentName />
      </ThemeProvider>
    )
  })
})
```

## Testing

1. **Unit Tests**

```bash
pnpm test          # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

2. **E2E Tests**

```bash
pnpm test:e2e    # Run E2E tests
pnpm test:e2e:ui # Run E2E tests with UI
```

3. **Visual Tests**

```bash
pnpm build-storybook # Build Storybook
pnpm storybook      # Run Storybook
```

## Theming System

The theming system uses CSS variables and Tailwind CSS. Key files:

1. `src/theme/ThemeProvider.tsx`: Theme context and provider
2. `src/styles/globals.css`: Default theme variables
3. `tailwind.config.js`: Tailwind configuration

### Adding Theme Variables

1. Add the variable to `globals.css`:

```css
:root {
  --new-variable: value;
}
```

2. Add to Tailwind config:

```js
module.exports = {
  theme: {
    extend: {
      // Add your extension
    },
  },
}
```

3. Add to ThemeProvider interface:

```ts
export interface ThemeConfig {
  // Add your new theme option
}
```

## Release Process

1. Update version:

```bash
pnpm version <patch|minor|major>
```

2. Build and test:

```bash
pnpm build
pnpm test
pnpm test:e2e
```

3. Publish:

```bash
pnpm publish
```

## Code Style

- Follow the ESLint configuration
- Use Prettier for formatting
- Run `pnpm format` before committing

## Best Practices

1. **Accessibility**

   - Include proper ARIA attributes
   - Support keyboard navigation
   - Test with screen readers
   - Maintain proper color contrast

2. **Performance**

   - Keep bundle size minimal
   - Implement proper memoization
   - Use tree-shakeable exports

3. **Documentation**
   - Include JSDoc comments
   - Document all props
   - Provide usage examples
   - Include accessibility notes

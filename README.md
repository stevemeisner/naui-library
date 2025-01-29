# @naui/core

A modern, accessible React component library built with TypeScript, TailwindCSS, and a powerful theming system.

## ✨ Features

- 🎨 **Beautiful by Default**

  - Modern, clean design
  - Consistent component APIs
  - Responsive and adaptive
  - Dark mode ready

- 🌈 **Powerful Theming**

  - CSS Variables + TailwindCSS
  - Runtime theme switching
  - Type-safe configuration
  - Automatic dark mode

- 🛠️ **Developer Experience**

  - React 18 + TypeScript
  - Tree-shakeable exports
  - Comprehensive documentation
  - Storybook integration

- ♿ **Accessibility First**

  - WCAG 2.1 AA compliant
  - Keyboard navigation
  - Screen reader optimized
  - High contrast support

- 🧪 **Battle-tested**
  - Unit tests (Vitest)
  - E2E tests (Playwright)
  - Visual regression testing
  - Accessibility testing

## 🚀 Quick Start

```bash
pnpm add @naui/core
```

```tsx
import { Button, ThemeProvider } from '@naui/core'

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Get Started</Button>
    </ThemeProvider>
  )
}
```

## 🎨 Theming System

NAUI uses a powerful theming system that combines CSS variables with TailwindCSS for maximum flexibility and type safety.

### Default Theme

```tsx
const theme = {
  colors: {
    primary: {
      500: '16 185 129', // RGB values for opacity support
      600: '5 150 105',
      700: '4 120 87',
    },
  },
  borderRadius: {
    button: '0.5rem',
  },
}
```

### Theme Configuration

The theme system supports:

1. **Colors** (RGB values for opacity)

   - `primary`: Main brand color (required)
   - `secondary`: Secondary palette (optional)
   - Shades from 50 (lightest) to 950 (darkest)
   - Semantic colors: success, error, warning, info

2. **Border Radius**

   - `button`: Button corners
   - `input`: Input field corners
   - `card`: Card corners

3. **Dark Mode**
   - Automatic dark mode support
   - No additional configuration needed
   - Uses CSS variables for smooth transitions

### TypeScript Support

```tsx
import { ThemeProvider, type ThemeConfig } from '@naui/core'

// Full type safety and autocompletion
const theme: ThemeConfig = {
  colors: {
    primary: {
      // Your IDE will show all required shades
    },
  },
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  )
}
```

## 🧩 Components

Current components:

- ✅ **Button** - Flexible button with multiple variants
  - Primary, Secondary, Outline, Ghost variants
  - Loading and disabled states
  - Small, Medium, Large sizes
  - Full keyboard navigation

Coming soon:

- 🔄 **Input** - Form input components
- 🔄 **Card** - Content container
- 🔄 **Modal** - Dialog and overlay

## 🛠️ Development

### Installation

```bash
# npm
npm install @naui/core

# yarn
yarn add @naui/core

# pnpm
pnpm add @naui/core
```

### Local Development

```bash
pnpm dev       # Start Storybook
pnpm check     # Run all checks
pnpm fix       # Fix formatting
```

### Testing

```bash
# Unit Tests
pnpm test:unit        # Run unit tests
pnpm test:unit:watch  # Watch mode

# E2E Tests
pnpm test:e2e         # Run E2E tests
pnpm test:e2e:ui      # With UI

# Visual Tests
pnpm test:visual      # Run visual tests
pnpm test:visual:update # Update snapshots

# All Tests
pnpm test:all        # Run everything
```

## 📚 Documentation

- [Component Documentation](https://naui.netlify.app) - Interactive Storybook
- [Usage Guide](docs/CONSUMER.md) - Using the library
- [Contributing](docs/CONTRIBUTING.md) - Development guide

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](docs/CONTRIBUTING.md) for:

- Development setup
- Component guidelines
- Testing workflows
- Release process

## 📄 License

MIT © [Your Organization]

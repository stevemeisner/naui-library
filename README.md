# @your-org/ui-library

A modern, accessible React component library built with TypeScript, TailwindCSS, and a powerful theming system.

## 🚀 Quick Start

```bash
pnpm add @your-org/ui-library
```

```tsx
import { Button, ThemeProvider } from '@your-org/ui-library'

function App() {
  return (
    <ThemeProvider>
      <Button>Click me!</Button>
    </ThemeProvider>
  )
}
```

## 📚 Documentation

Choose the documentation that best fits your needs:

- [Using the Library](docs/CONSUMER.md) - For developers using the component library in their applications
- [Contributing](docs/CONTRIBUTING.md) - For developers who want to contribute to the library

## ✨ Features

- 🎨 **Powerful Theming System**

  - CSS Variables + Tailwind
  - Runtime theme switching
  - Type-safe theme configuration

- 🌐 **Modern Stack**

  - React 18
  - TypeScript
  - TailwindCSS
  - Storybook 8

- ♿ **Accessibility First**

  - WCAG 2.1 AA compliant
  - Keyboard navigation
  - Screen reader support
  - Proper ARIA attributes

- 🧪 **Comprehensive Testing**
  - Unit tests (Vitest)
  - E2E tests (Playwright)
  - Visual regression
  - Accessibility testing

## 🎨 Theming Example

```tsx
const theme = {
  colors: {
    primary: {
      500: '16 185 129', // RGB values
      600: '5 150 105',
      700: '4 120 87',
    },
  },
  borderRadius: {
    button: '0.5rem',
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

- ✅ Button
- 🔄 Input (Coming soon)
- 🔄 Card (Coming soon)
- 🔄 Modal (Coming soon)

## 📦 Installation

```bash
# npm
npm install @your-org/ui-library

# yarn
yarn add @your-org/ui-library

# pnpm
pnpm add @your-org/ui-library
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 📄 License

MIT © [Your Organization]

## 🧪 Testing

This library uses a comprehensive testing setup:

### Unit Tests

```bash
pnpm test:unit        # Run unit tests
pnpm test:unit:watch  # Run unit tests in watch mode
```

### E2E Tests

```bash
pnpm test:e2e         # Run E2E tests
pnpm test:e2e:ui      # Run E2E tests with UI
pnpm test:e2e:visual  # Run visual regression tests
```

Tests are run against a local test environment in `e2e/test-pages`. Visual regression tests use Playwright for consistent screenshots across environments.

### Running All Tests

```bash
pnpm test:all  # Run all tests (unit, E2E, and visual)
```

### Development Workflow

```bash
pnpm check            # Run all checks (format, lint, tests)
pnpm fix             # Fix formatting and linting issues
```

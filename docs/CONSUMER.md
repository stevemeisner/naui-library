# Using the UI Library

## Installation

```bash
npm install @your-org/ui-library
# or
yarn add @your-org/ui-library
# or
pnpm add @your-org/ui-library
```

## Setup

1. Add the library's Tailwind preset to your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@your-org/ui-library/preset')],
  // your config...
}
```

2. Wrap your application with the ThemeProvider:

```tsx
import { ThemeProvider } from '@your-org/ui-library'

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

## Customizing the Theme

You can customize the theme by passing a theme configuration to the ThemeProvider:

```tsx
const theme = {
  colors: {
    primary: {
      50: '236 253 245', // RGB values
      100: '209 250 229',
      500: '16 185 129',
      600: '5 150 105',
      700: '4 120 87',
    },
    secondary: {
      500: '20 184 166',
      600: '13 148 136',
      700: '15 118 110',
    },
    success: '34 197 94',
    error: '239 68 68',
    warning: '234 179 8',
    info: '59 130 246',
  },
  borderRadius: {
    button: '0.5rem',
    input: '0.375rem',
    card: '0.5rem',
  },
  transitions: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
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

## Components

### Button

A versatile button component that supports multiple variants, sizes, and states.

```tsx
import { Button } from '@your-org/ui-library'
```

#### Props

| Prop        | Type                                               | Default     | Description            |
| ----------- | -------------------------------------------------- | ----------- | ---------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style variant   |
| `size`      | `'sm' \| 'md' \| 'lg'`                             | `'md'`      | Button size            |
| `loading`   | `boolean`                                          | `false`     | Shows loading spinner  |
| `disabled`  | `boolean`                                          | `false`     | Disables button        |
| `onClick`   | `(e: MouseEvent) => void`                          | -           | Click handler          |
| `className` | `string`                                           | -           | Additional CSS classes |

#### Examples

```tsx
// Basic usage with event handler
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>

// Variants
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="outline" />
<Button variant="ghost" />

// States
<Button loading />
<Button disabled />

// Custom styling
<Button className="w-full" />
```

## Dynamic Theming

You can switch themes dynamically:

```tsx
function App() {
  const [isDark, setIsDark] = useState(false)

  const lightTheme = {
    colors: {
      primary: {
        500: '16 185 129',
        600: '5 150 105',
        700: '4 120 87',
      },
      // ...
    },
  }

  const darkTheme = {
    colors: {
      primary: {
        500: '20 184 166',
        600: '13 148 136',
        700: '15 118 110',
      },
      // ...
    },
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
      <YourApp />
    </ThemeProvider>
  )
}
```

## Best Practices

1. Always provide fallback colors for all shades (50-950) in your theme
2. Use RGB values for colors to support opacity
3. Keep transitions consistent across components
4. Test your theme changes across all components before deploying

## Troubleshooting

Common issues and solutions:

1. **Colors not applying**: Ensure you're using RGB values without the `rgb()` wrapper
2. **Transitions not working**: Check if you've provided all required transition durations
3. **Theme not updating**: Verify your theme object is properly memoized if it's dynamic

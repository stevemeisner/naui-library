# Testing Guide

## Overview

This library uses a comprehensive testing approach:

- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Visual Tests**: Storybook + Playwright
- **Accessibility Tests**: axe-core

## Running Tests

```bash
pnpm test           # Unit tests
pnpm test:e2e      # E2E tests
pnpm test:e2e:ui   # E2E tests with UI
pnpm test:coverage  # Test coverage
```

## Test Utilities

Our test utilities make it easy to write consistent, accessible tests:

```typescript
import {
  getStoryFrame,
  goToStory,
  testAccessibility,
  testKeyboardAccessibility,
} from './e2e/test-utils'
```

### Example Usage

```typescript
const COMPONENT = 'dropdown'
const VARIANTS = ['default', 'multiselect']

test('has no accessibility violations', async ({ page }) => {
  await testAccessibility(page, COMPONENT, VARIANTS, 'listbox')
})

test('is keyboard accessible', async ({ page }) => {
  const frame = getStoryFrame(page)
  await testKeyboardAccessibility(page, frame, {
    role: 'listbox',
    name: 'Select an option',
    keys: ['{Enter}', '{ArrowDown}'],
  })
})
```

## Test Structure

Each component should have:

```
src/components/YourComponent/
├── YourComponent.test.tsx     # Unit tests
└── YourComponent.stories.tsx  # Storybook tests

e2e/
└── yourcomponent.spec.ts      # E2E & Visual tests
```

## Best Practices

1. **Unit Tests**

   - Test component logic and props
   - Use React Testing Library patterns
   - Test keyboard interactions
   - Verify ARIA attributes

2. **E2E Tests**

   - Test real browser behavior
   - Verify all variants
   - Check accessibility
   - Test responsive design

3. **Visual Tests**

   - Capture key states
   - Test hover/focus
   - Check dark mode
   - Verify responsive layouts

4. **Accessibility Tests**
   - Use semantic HTML
   - Test with keyboard
   - Verify screen readers
   - Check color contrast

## Advanced: Manual Test Creation

> ⚠️ For most cases, use `pnpm create-component` instead. This section is for custom testing needs only.

If you need to write tests manually:

1. **Unit Tests**: Use React Testing Library patterns

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('handles click events', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

2. **E2E Tests**: Use Playwright patterns

```typescript
test('shows dropdown on click', async ({ page }) => {
  const frame = getStoryFrame(page)
  await frame.getByRole('button').click()
  await expect(frame.getByRole('listbox')).toBeVisible()
})
```

3. **Visual Tests**: Use screenshots

```typescript
test('matches visual snapshot', async ({ page }) => {
  const frame = getStoryFrame(page)
  await expect(frame.getByRole('button')).toHaveScreenshot()
})
```

import { test as base, expect } from '@playwright/test'

import { testAccessibility } from './test-utils'

/**
 * E2E tests for the Button component.
 * These tests verify the component's behavior in a real browser environment,
 * including accessibility, visual appearance, and user interactions.
 */

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('http://localhost:5173/button')
    await use(page)
  },
})

test.describe('Button Component', () => {
  test('renders variants correctly', async ({ page }) => {
    const primaryButton = page.getByTestId('primary')
    const secondaryButton = page.getByTestId('secondary')

    await expect(primaryButton).toBeVisible()
    await expect(secondaryButton).toBeVisible()

    await expect(primaryButton).toHaveClass(/bg-primary-600/)
    await expect(secondaryButton).toHaveClass(/bg-secondary-600/)
  })

  test('handles click events', async ({ page }) => {
    const button = page.getByTestId('primary')
    await button.click()
  })

  test('shows loading state with proper ARIA attributes', async ({ page }) => {
    const button = page.getByTestId('loading')
    await expect(button).toHaveAttribute('aria-busy', 'true')
    await expect(button).toHaveAttribute('aria-disabled', 'true')
    await expect(button).toBeDisabled()
  })

  test('handles disabled state', async ({ page }) => {
    const button = page.getByTestId('disabled')
    await expect(button).toBeDisabled()
    await expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  test('has no accessibility violations', async ({ page }) => {
    await testAccessibility(page)
  })

  test('is keyboard accessible', async ({ page }) => {
    const button = page.getByTestId('primary')
    await button.focus()
    await expect(button).toBeFocused()

    await page.keyboard.press('Enter')
    await page.keyboard.press('Space')
  })
})

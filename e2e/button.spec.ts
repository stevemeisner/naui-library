import { test as base, expect } from '@playwright/test'

import { goToStory, testAccessibility } from './test-utils'

/**
 * E2E tests for the Button component.
 * These tests verify the component's behavior in a real browser environment,
 * including accessibility, visual appearance, and user interactions.
 */

const STORY_ID = 'components-button'

const test = base.extend({
  page: async ({ page }, use) => {
    await goToStory(page, `${STORY_ID}--primary`)
    await use(page)
  },
})

test.describe('Button Component', () => {
  test('renders variants correctly', async ({ page }) => {
    const primaryButton = page.getByRole('button', { name: 'Button' })
    await expect(primaryButton).toBeVisible()
    await expect(primaryButton).toHaveClass(/bg-primary-600/)

    await goToStory(page, `${STORY_ID}--secondary`)
    const secondaryButton = page.getByRole('button', { name: 'Button' })
    await expect(secondaryButton).toBeVisible()
    await expect(secondaryButton).toHaveClass(/bg-secondary-600/)
  })

  test('handles click events', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await button.click()
  })

  test('shows loading state with proper ARIA attributes', async ({ page }) => {
    await goToStory(page, `${STORY_ID}--loading`)
    const button = page.getByRole('button')
    await expect(button).toHaveAttribute('aria-busy', 'true')
    await expect(button).toHaveAttribute('aria-disabled', 'true')
    await expect(button).toBeDisabled()
  })

  test('handles disabled state', async ({ page }) => {
    await goToStory(page, `${STORY_ID}--disabled`)
    const button = page.getByRole('button')
    await expect(button).toBeDisabled()
    await expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  test('has no accessibility violations', async ({ page }) => {
    await testAccessibility(page)
  })

  test('is keyboard accessible', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await button.focus()
    await expect(button).toBeFocused()

    await page.keyboard.press('Enter')
    await page.keyboard.press('Space')
  })
})

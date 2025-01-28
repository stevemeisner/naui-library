import { test as base, expect } from '@playwright/test'

const test = base.extend({
  page: async ({ page }, use) => {
    // Set viewport size
    await page.setViewportSize({ width: 1280, height: 720 })
    // Navigate to test page
    await page.goto('http://localhost:5173/button')
    // Ensure consistent environment for visual tests
    await page.waitForLoadState('networkidle')
    await use(page)
  },
})

test('variants visual comparison', async ({ page }) => {
  const primaryButton = page.getByTestId('primary')
  const secondaryButton = page.getByTestId('secondary')

  await expect(primaryButton).toHaveScreenshot('button-primary.png', {
    animations: 'disabled',
    scale: 'device',
  })

  await expect(secondaryButton).toHaveScreenshot('button-secondary.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

test('sizes visual comparison', async ({ page }) => {
  const smallButton = page.getByTestId('small')
  const largeButton = page.getByTestId('large')

  await expect(smallButton).toHaveScreenshot('button-small.png', {
    animations: 'disabled',
    scale: 'device',
  })

  await expect(largeButton).toHaveScreenshot('button-large.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

test('states visual comparison', async ({ page }) => {
  const loadingButton = page.getByTestId('loading')
  const disabledButton = page.getByTestId('disabled')

  await expect(loadingButton).toHaveScreenshot('button-loading.png', {
    animations: 'disabled',
    scale: 'device',
  })

  await expect(disabledButton).toHaveScreenshot('button-disabled.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

test('hover state', async ({ page }) => {
  const button = page.getByTestId('primary')
  await button.hover()

  await expect(button).toHaveScreenshot('button-hover.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

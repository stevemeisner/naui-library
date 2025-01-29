import { test as base, expect } from '@playwright/test'

import { goToStory } from './test-utils'

const STORY_ID = 'components-button'

const test = base.extend({
  page: async ({ page }, use) => {
    // Set viewport size
    await page.setViewportSize({ width: 1280, height: 720 })
    await use(page)
  },
})

test('variants visual comparison', async ({ page }) => {
  await goToStory(page, `${STORY_ID}--primary`)
  const primaryButton = page.getByRole('button')
  await expect(primaryButton).toHaveScreenshot('button-primary.png', {
    animations: 'disabled',
    scale: 'device',
  })

  await goToStory(page, `${STORY_ID}--secondary`)
  const secondaryButton = page.getByRole('button')
  await expect(secondaryButton).toHaveScreenshot('button-secondary.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

test('sizes visual comparison', async ({ page }) => {
  await goToStory(page, `${STORY_ID}--small`)
  const smallButton = page.getByRole('button')
  await expect(smallButton).toHaveScreenshot('button-small.png', {
    animations: 'disabled',
    scale: 'device',
  })

  await goToStory(page, `${STORY_ID}--large`)
  const largeButton = page.getByRole('button')
  await expect(largeButton).toHaveScreenshot('button-large.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

test('states visual comparison', async ({ page }) => {
  await goToStory(page, `${STORY_ID}--loading`)
  const loadingButton = page.getByRole('button')
  await expect(loadingButton).toHaveScreenshot('button-loading.png', {
    animations: 'disabled',
    scale: 'device',
  })

  await goToStory(page, `${STORY_ID}--disabled`)
  const disabledButton = page.getByRole('button')
  await expect(disabledButton).toHaveScreenshot('button-disabled.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

test('hover state', async ({ page }) => {
  await goToStory(page, `${STORY_ID}--primary`)
  const button = page.getByRole('button')
  await button.hover()

  await expect(button).toHaveScreenshot('button-hover.png', {
    animations: 'disabled',
    scale: 'device',
  })
})

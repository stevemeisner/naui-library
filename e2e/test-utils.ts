import { default as AxeBuilder } from '@axe-core/playwright'
import { Page, expect } from '@playwright/test'

type AriaRole =
  | 'button'
  | 'link'
  | 'heading'
  | 'textbox'
  | 'checkbox'
  | 'radio'
  | 'tab'
  | 'tabpanel'
  | 'listbox'
  | 'option'
  | 'menu'
  | 'menuitem'
  | 'dialog'

/**
 * Run accessibility tests for a component
 */
export const testAccessibility = async (page: Page) => {
  const results = await new AxeBuilder({ page })
    .options({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'best-practice'],
      },
    })
    .analyze()

  expect(results.violations).toEqual([])
}

/**
 * Test keyboard accessibility for an interactive element
 */
export const testKeyboardAccessibility = async (
  page: Page,
  options: {
    role: AriaRole
    name: string
    testId: string
    keys?: string[]
  }
) => {
  const element = page.getByTestId(options.testId)

  await element.waitFor({ state: 'visible', timeout: 10000 })
  await element.focus()
  await expect(element).toBeFocused()

  // Press specified keys or default to Enter and Space
  const keysToPress = options.keys || ['Enter', 'Space']
  for (const key of keysToPress) {
    await page.keyboard.press(key)
  }
}

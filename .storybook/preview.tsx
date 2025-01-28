import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const withA11y = (Story, context) => {
  const title = context.title.split('/').pop() || 'Component'
  return (
    <div className="min-h-screen">
      <main>
        <h1 className="text-xl font-bold mb-4">{title} Example</h1>
        <div className="p-4">
          <Story />
        </div>
      </main>
    </div>
  )
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      story: {
        inline: true,
        iframeHeight: '200px',
      },
    },
  },
  decorators: [withA11y],
}

export default preview

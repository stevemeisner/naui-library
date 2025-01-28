import React from 'react'

import { createRoot } from 'react-dom/client'

import { Button } from '../../src/components/Button'
import { ThemeProvider } from '../../src/theme'

import './styles.css'

function ButtonTestPage() {
  return (
    <ThemeProvider>
      <div className="p-8 flex flex-col gap-4">
        <div id="variants" className="flex gap-4">
          <Button variant="primary" data-testid="primary">
            Primary Button
          </Button>
          <Button variant="secondary" data-testid="secondary">
            Secondary Button
          </Button>
        </div>

        <div id="sizes" className="flex gap-4">
          <Button size="sm" data-testid="small">
            Small Button
          </Button>
          <Button size="lg" data-testid="large">
            Large Button
          </Button>
        </div>

        <div id="states" className="flex gap-4">
          <Button loading data-testid="loading">
            Loading Button
          </Button>
          <Button disabled data-testid="disabled">
            Disabled Button
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

// Mount the app
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <ButtonTestPage />
    </React.StrictMode>
  )
}

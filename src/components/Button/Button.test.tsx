import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ThemeProvider } from '@/theme'

import { Button } from './Button'

describe('Button', () => {
  it('renders with default theme', () => {
    render(
      <ThemeProvider>
        <Button>Click me</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies custom theme colors', () => {
    const theme = {
      colors: {
        primary: {
          600: '255 0 0',
          700: '200 0 0',
        },
      },
    }

    render(
      <ThemeProvider theme={theme}>
        <Button variant="primary">Themed Button</Button>
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary-600')
  })

  it('applies custom border radius from theme', () => {
    const theme = {
      borderRadius: {
        button: '1rem',
      },
    }

    render(
      <ThemeProvider theme={theme}>
        <Button>Rounded Button</Button>
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-button')
  })

  it('renders different variants', () => {
    render(
      <ThemeProvider>
        <>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </>
      </ThemeProvider>
    )

    expect(screen.getByText('Primary')).toHaveClass('bg-primary-600')
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary-600')
    expect(screen.getByText('Outline')).toHaveClass('border-primary-600')
    expect(screen.getByText('Ghost')).toHaveClass('text-primary-600')
  })

  it('renders different sizes', () => {
    render(
      <ThemeProvider>
        <>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </>
      </ThemeProvider>
    )

    expect(screen.getByText('Small')).toHaveClass('h-8')
    expect(screen.getByText('Medium')).toHaveClass('h-10')
    expect(screen.getByText('Large')).toHaveClass('h-12')
  })

  it('shows loading state', () => {
    render(
      <ThemeProvider>
        <Button loading>Loading</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('handles disabled state', () => {
    render(
      <ThemeProvider>
        <Button disabled>Disabled</Button>
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('handles click events when not disabled or loading', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <Button onClick={handleClick}>Click me</Button>
      </ThemeProvider>
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not handle click events when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <Button disabled onClick={handleClick}>
          Click me
        </Button>
      </ThemeProvider>
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not handle click events when loading', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <Button loading onClick={handleClick}>
          Click me
        </Button>
      </ThemeProvider>
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('handles keyboard events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Press me</Button>)
    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()
    await userEvent.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('calls custom onKeyDown handler when provided', async () => {
    const handleKeyDown = vi.fn()
    render(<Button onKeyDown={handleKeyDown}>Press me</Button>)
    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')
    expect(handleKeyDown).toHaveBeenCalled()
    expect(handleKeyDown.mock.calls[0][0]).toHaveProperty('key', 'Enter')
  })

  it('displays loading state with proper ARIA attributes', () => {
    render(<Button loading>Loading...</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('handles disabled state with ARIA attributes', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('applies different variants with proper focus styles', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary-600')
  })

  it('applies different sizes', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-8 px-3 text-sm')
  })

  it('applies custom aria-label', () => {
    render(<Button aria-label="Custom label">Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label')
  })
})

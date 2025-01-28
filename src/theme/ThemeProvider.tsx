import React, { createContext, useContext, useEffect } from 'react'

export interface ThemeColors {
  primary?: {
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
    950?: string
  }
  secondary?: {
    50?: string
    100?: string
    200?: string
    300?: string
    400?: string
    500?: string
    600?: string
    700?: string
    800?: string
    900?: string
    950?: string
  }
  success?: string
  error?: string
  warning?: string
  info?: string
}

export interface ThemeConfig {
  colors?: ThemeColors
  borderRadius?: {
    button?: string
    input?: string
    card?: string
  }
  transitions?: {
    fast?: string
    normal?: string
    slow?: string
  }
}

const ThemeContext = createContext<ThemeConfig>({})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  theme?: ThemeConfig
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme = {}, children }) => {
  useEffect(() => {
    const root = document.documentElement

    // Update color variables
    if (theme.colors?.primary) {
      Object.entries(theme.colors.primary).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--color-primary-${key}`, value)
        }
      })
    }

    if (theme.colors?.secondary) {
      Object.entries(theme.colors.secondary).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--color-secondary-${key}`, value)
        }
      })
    }

    // Update semantic colors
    if (theme.colors?.success) {
      root.style.setProperty('--color-success', theme.colors.success)
    }
    if (theme.colors?.error) {
      root.style.setProperty('--color-error', theme.colors.error)
    }
    if (theme.colors?.warning) {
      root.style.setProperty('--color-warning', theme.colors.warning)
    }
    if (theme.colors?.info) {
      root.style.setProperty('--color-info', theme.colors.info)
    }

    // Update border radius
    if (theme.borderRadius?.button) {
      root.style.setProperty('--button-radius', theme.borderRadius.button)
    }
    if (theme.borderRadius?.input) {
      root.style.setProperty('--input-radius', theme.borderRadius.input)
    }
    if (theme.borderRadius?.card) {
      root.style.setProperty('--card-radius', theme.borderRadius.card)
    }

    // Update transitions
    if (theme.transitions?.fast) {
      root.style.setProperty('--transition-fast', theme.transitions.fast)
    }
    if (theme.transitions?.normal) {
      root.style.setProperty('--transition-normal', theme.transitions.normal)
    }
    if (theme.transitions?.slow) {
      root.style.setProperty('--transition-slow', theme.transitions.slow)
    }
  }, [theme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

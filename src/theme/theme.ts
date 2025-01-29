export const defaultTheme = {
  colors: {
    primary: {
      50: '255 251 235', // Lightest yellow
      100: '254 243 199',
      200: '253 230 138',
      300: '252 211 77',
      400: '251 191 36',
      500: '217 158 8', // Darker yellow
      600: '146 97 2', // Main button color (meets 4.5:1 with white)
      700: '120 80 2', // Hover state
      800: '97 65 2',
      900: '78 52 2',
      950: '69 26 3', // Near black
    },
    secondary: {
      50: '249 250 251',
      100: '243 244 246',
      200: '229 231 235',
      300: '209 213 219',
      400: '156 163 175',
      500: '107 114 128',
      600: '45 55 72', // Adjusted for better contrast
      700: '37 47 63',
      800: '30 41 59',
      900: '17 24 39',
      950: '3 7 18',
    },
  },
  borderRadius: {
    button: '0.5rem',
  },
} as const

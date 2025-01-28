import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist/test-pages'),
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
})

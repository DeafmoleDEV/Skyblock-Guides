import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'


export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  base: mode === 'production' && !process.env.GITHUB_ACTIONS ? '/' : '/Skyblock-Guides/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
}))

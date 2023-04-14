/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      test: {
        environment: 'jsdom'
      }
    }
  } else {
    return {
      plugins: [react({
        babel: {
          plugins: [
            ["react-remove-properties", { "properties": ["data-testid"] }]
          ]
        }
      })],
      test: {
        environment: 'jsdom'
      }
    }
  }
})
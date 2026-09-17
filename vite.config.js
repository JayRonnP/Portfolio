import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// Configure Vite to launch Google Chrome instead of Microsoft Edge
process.env.BROWSER = 'chrome'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ['@use-gesture/react', 'three', 'gsap', 'ogl', 'lucide-react', 'canvas-confetti'],
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CocoSmart/',
  assetsInclude: ['**/*.zip', '**/*.md', '**/*.pdf'],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
})

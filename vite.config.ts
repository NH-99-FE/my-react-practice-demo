import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://m1.apifoxmock.com/m1/6627154-6334500-default',
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
})

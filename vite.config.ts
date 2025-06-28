import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

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
  build: {
    rollupOptions: {
      output: {
        //分包
        manualChunks: {
          'react-vendor': ['react', 'react-router'],
          'antd-vendor': ['antd'],
          'echarts-vendor': ['echarts'],
          'user-vendor': [
            './src/pages/user',
            './src/pages/dept',
            './src/pages/role',
            './src/pages/menu',
          ],
        },
      },
    },
  },
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
})

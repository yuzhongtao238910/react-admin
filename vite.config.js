import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'echarts': ['echarts'],
          'redux': ['redux', 'react-redux'],
          'antd': ['antd'],
        },
      },
    }
  }
})

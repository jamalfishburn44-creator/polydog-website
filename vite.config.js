import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        launch: resolve(__dirname, 'launch.html'),
        whitepaper: resolve(__dirname, 'whitepaper.html'),
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  }
})

/**
 * vite.config.js — dev server only.
 * Serves all static files from the project root on port 5000.
 * The site is plain HTML/CSS/JS — no module bundling at dev time.
 */
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
})

/**
 * vite.bundle.config.js
 * Builds wallet.bundle.js — a single self-contained IIFE that can be
 * served as a plain static file (no module loader needed).
 *
 * Run:  npm run build:bundle
 * Output: wallet.bundle.js  (committed to repo, served by GitHub Pages)
 */

import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/wallet-entry.js'),
      name: 'PolyDogWallet',
      formats: ['iife'],
      // Return the exact filename — Vite uses it as-is when it contains a dot
      fileName: () => 'wallet.bundle.js',
    },
    outDir: 'dist-bundle',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        // Required for IIFE: inline all dynamic imports into one file
        inlineDynamicImports: true,
      },
    },
  },
  // Inline the project ID and replace all env/process references so the
  // bundle has no runtime dependencies on build-time variables
  define: {
    'import.meta.env.VITE_WALLETCONNECT_PROJECT_ID': JSON.stringify('eedc7ce28f2c0638346d53f90f90973c'),
    'import.meta.env.MODE':  JSON.stringify('production'),
    'import.meta.env.DEV':   JSON.stringify(false),
    'import.meta.env.PROD':  JSON.stringify(true),
    'import.meta.env.SSR':   JSON.stringify(false),
    'process.env.NODE_ENV':  JSON.stringify('production'),
    'process.version':       JSON.stringify(''),
  },
})

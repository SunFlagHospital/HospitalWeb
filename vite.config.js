import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      jsxImportSource: 'react',
    }),
    // Enable Gzip compression for all assets
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10KB - compress files > 10KB
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
          // Firebase chunked separately for lazy loading
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage'],
          // Motion & animations
          'motion': ['framer-motion'],
          // UI libraries
          'ui': ['lucide-react', 'react-hot-toast', 'react-icons'],
          // Forms and hooks
          'forms': ['react-hook-form'],
          // External integrations
          'integrations': ['imagekit', 'yet-another-react-lightbox', 'swiper'],
        },
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
})

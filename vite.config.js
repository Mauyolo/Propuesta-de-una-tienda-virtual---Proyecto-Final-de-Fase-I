import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // Genera sourcemaps en producción para debugging
    sourcemap: false,
    // Divide chunks para mejor cacheado
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    }
  },

  server: {
    port: 5173,
    proxy: {
      // En dev, las llamadas a /api se redirigen al backend local
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})

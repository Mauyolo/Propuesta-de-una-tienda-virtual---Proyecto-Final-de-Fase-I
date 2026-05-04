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
    strictPort: false,  // Si 5173 está ocupado, usa 5174, 5175, etc.
    proxy: {
      // En dev, las llamadas a /api se redirigen al backend local (server-to-server, sin CORS)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

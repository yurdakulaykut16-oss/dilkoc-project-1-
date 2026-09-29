import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 1420,
    strictPort: true,
    allowedHosts: true,
    // Gerçek debpalash/VoiceStudio backend'i 3900'da çalışır. Browser tarafı
    // localhost çağırmaz; /voicestudio göreli yolunu Vite güvenli şekilde proxy'ler.
    proxy: {
      '/voicestudio': {
        target: 'http://127.0.0.1:3900',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/voicestudio/, ''),
      },
    },
    watch: {
      ignored: ['**/src-tauri/target/**']
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const voiceStudioPort = Number(process.env.VOICESTUDIO_PORT || 3900)

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 1420,
    strictPort: true,
    allowedHosts: true,
    // Gerçek debpalash/VoiceStudio backend'i launcher'ın VOICESTUDIO_PORT
    // değerinde çalışır. Browser localhost çağırmaz; /voicestudio göreli yolunu
    // Vite güvenli şekilde proxy'ler.
    proxy: {
      '/voicestudio': {
        target: `http://127.0.0.1:${voiceStudioPort}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/voicestudio/, ''),
      },
    },
    watch: {
      // VoiceStudio's Python venv contains tens of thousands of headers and
      // must never be watched by Vite (it can exhaust Linux inotify limits).
      ignored: ['**/src-tauri/target/**', '**/.runtime/**']
    }
  }
})

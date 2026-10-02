import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const voiceStudioPort = Number(process.env.VOICESTUDIO_PORT || 3900)

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true, passes: 2 },
      mangle: { toplevel: true },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    host: true,
    port: 1420,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      '/voicestudio': {
        target: `http://127.0.0.1:${voiceStudioPort}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/voicestudio/, ''),
      },
    },
    watch: {
      ignored: ['**/src-tauri/target/**', '**/.runtime/**']
    }
  },
  preview: {
    host: true,
    port: 1420,
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
})

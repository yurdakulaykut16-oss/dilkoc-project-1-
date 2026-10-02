import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const voiceStudioPort = Number(process.env.VOICESTUDIO_PORT || 3900)

export default defineConfig({
  plugins: [react()],
  // ========================================================================
  // ÜRETİM GÜVENLİĞİ:
  //  • sourcemap: false → derlenmiş koddan kaynağa geri gidilemez
  //  • terser drop_console → tüm console.log/info çıktıları paketten silinir
  //    (konsol mesajlarından iç yapı öğrenilemez)
  //  • mangle toplevel → tüm üst düzey değişken/fonksiyon adları karıştırılır
  //  • comments: false → telif/yorum satırları paketten çıkarılır
  // ========================================================================
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true, passes: 2 },
      mangle: { toplevel: true },
      format: { comments: false },
    },
    // Tek paket: kod bölme (code splitting) kapatıldı → derleme çıktısında
    // import/export kalmaz → build sonrası obfuscation güvenle uygulanabilir
    // ve dağıtılan pakette uygulamanın tamamı tek, karartılmış dosyadır.
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
  },
  // `vite preview` (üretim derlemesinin yerel sunucusu) için güvenlik başlıkları.
  // NOT: Bunlar dev sunucusuna uygulanmaz; canlı önizleme (HMR/WebSocket)
  // etkilenmez. Gerçek dağıtımda (Netlify/Vercel/nginx) aynı başlıklar
  // sunucu tarafında da ayarlanmalıdır.
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

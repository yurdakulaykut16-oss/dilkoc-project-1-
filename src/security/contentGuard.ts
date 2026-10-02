/**
 * DilKoç © 2026 — Tüm hakları saklıdır (bkz. LICENSE).
 *
 * İÇERİK KORUMA KALKANI
 * ---------------------
 * Üretim (production) derlemesinde otomatik etkinleşir; geliştirme
 * ortamını (dev sunucusu, hata ayıklama) rahatsız etmez.
 *
 *   ?guard=on   → geliştirmede de test edilebilir
 *   ?guard=off  → acil durum kapatma anahtarı
 *
 * Sağladığı korumalar:
 *   • sağ tık / kopyala / kes / sürükle-bırak engeli (girdi alanları hariç)
 *   • metin seçimi engeli (girdi alanları hariç)
 *   • F12, Ctrl+Shift+I/J/C/K, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+A engeli
 *   • DevTools açık algılanınca içerik bulanıklaştırma + uyarı katmanı
 *   • sekre/taban değişince ve pencere odağı kaybolunca içerik bulanıklaşır
 *     (ekran kaydı / ekran görüntüsü alımını caydırır)
 *   • yazdırma / PDF çıkışı engeli (@media print)
 */

const OVERLAY_ID = 'dilkoc-shield-overlay';
const STYLE_ID = 'dilkoc-shield-style';
const BLUR_CLASS = 'dilkoc-shield-blur';

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || typeof el.tagName !== 'string') return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || el.isContentEditable === true;
}

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    *:not(input):not(textarea) {
      -webkit-user-select: none !important;
      user-select: none !important;
    }
    input, textarea {
      -webkit-user-select: text !important;
      user-select: text !important;
    }
    img { -webkit-user-drag: none !important; }
    .${BLUR_CLASS} #root {
      filter: blur(22px) grayscale(0.55) !important;
      pointer-events: none !important;
    }
    @media print {
      #root { display: none !important; }
      body::after {
        content: '© DilKoç 2026 — içerik yazdırılamaz / printing disabled';
        display: grid;
        place-items: center;
        min-height: 90vh;
        font: 700 18px system-ui, sans-serif;
        color: #333;
      }
    }
    #${OVERLAY_ID} {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background: rgba(10, 12, 20, 0.92);
      color: #f8fafc;
      display: grid;
      place-items: center;
      font: 14px/1.6 system-ui, sans-serif;
      text-align: center;
      cursor: default;
    }
    #${OVERLAY_ID} .box { max-width: 420px; padding: 28px; }
    #${OVERLAY_ID} h2 { margin: 0 0 10px; font-size: 20px; }
    #${OVERLAY_ID} p { margin: 6px 0; color: #94a3b8; }
  `;
  document.head.appendChild(style);
}

function ensureOverlay(): HTMLElement {
  let overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.innerHTML = `
      <div class="box">
        <h2>🔒 DilKoç içerik koruması</h2>
        <p>Geliştirici araçları açık görünüyor.</p>
        <p>Uygulama içeriği, telif hakkıyla korunan müfredatın çalınmasını önlemek için
           geçici olarak gizlendi. Geliştirici araçlarını kapattığında uygulama otomatik geri döner.</p>
        <p style="color:#64748b">© 2026 DilKoç — Tüm hakları saklıdır.</p>
      </div>
    `;
    overlay.style.display = 'none';
    document.body.appendChild(overlay);
  }
  return overlay;
}

function installKeyboardGuard() {
  document.addEventListener(
    'keydown',
    (event) => {
      const key = (event.key || '').toLowerCase();
      const meta = event.ctrlKey || event.metaKey;
      // F12 — geliştirici araçları
      if (key === 'f12') { event.preventDefault(); return false; }
      // Ctrl+Shift+I / J / C / K — konsol / denetici / kopyalama kısayolları
      if (meta && event.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) {
        event.preventDefault();
        return false;
      }
      // Ctrl+U kaynak / Ctrl+S kaydet / Ctrl+P yazdır
      if (meta && ['u', 's', 'p'].includes(key)) {
        event.preventDefault();
        return false;
      }
      // Ctrl+A — tümünü seç (girdi alanlarında serbest)
      if (meta && key === 'a' && !isEditable(event.target)) {
        event.preventDefault();
        return false;
      }
      return true;
    },
    true,
  );
}

function installDevtoolsWatch() {
  const overlay = ensureOverlay();
  let open = false;
  const check = () => {
    // Yana/alta yerleşen DevTools, pencere ile görünür alan arasında büyük fark yaratır.
    const detected =
      window.outerWidth - window.innerWidth > 220 ||
      window.outerHeight - window.innerHeight > 260;
    if (detected !== open) {
      open = detected;
      overlay.style.display = open ? 'grid' : 'none';
      document.documentElement.classList.toggle(BLUR_CLASS, open);
    }
  };
  window.setInterval(check, 1000);
  check();
}

function installFocusShield() {
  let blurTimer: number | undefined;
  const shieldOn = () => document.documentElement.classList.add(BLUR_CLASS);
  const shieldOff = () => document.documentElement.classList.remove(BLUR_CLASS);
  // Sekre/taban arka plana geçince anında bulanıklaştır.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) shieldOn();
    else shieldOff();
  });
  // Pencere odağı kaybolunca (ekran kaydedici / başka pencere) kısa gecikmeyle bulanıklaştır.
  window.addEventListener('blur', () => {
    blurTimer = window.setTimeout(shieldOn, 350);
  });
  window.addEventListener('focus', () => {
    if (blurTimer !== undefined) window.clearTimeout(blurTimer);
    shieldOff();
  });
}

export function installContentGuard(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  if (params.get('guard') === 'off') return;

  const forceOn = params.get('guard') === 'on';
  const env = (import.meta as unknown as { env?: { PROD?: boolean } }).env;
  const active = env?.PROD === true || forceOn;
  if (!active) return;

  injectStyles();
  ensureOverlay();

  // Sağ tık menüsü (girdi alanlarında açılır; içerikte engelli)
  document.addEventListener('contextmenu', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  });
  // Kopyala / kes (girdi alanlarında serbest — kullanıcı kendi yazdığını yönetebilir)
  document.addEventListener('copy', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  });
  document.addEventListener('cut', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  });
  // Metin seçimi (girdi alanlarında serbest)
  document.addEventListener('selectstart', (event) => {
    if (!isEditable(event.target)) event.preventDefault();
  });
  // Görsel/öge sürükleme
  document.addEventListener('dragstart', (event) => event.preventDefault());

  installKeyboardGuard();
  installDevtoolsWatch();
  installFocusShield();
}

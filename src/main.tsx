// DilKoç © 2026 — Bu kaynak kod telif hakkıyla korunur. İzinsiz kopyalama,
// dağıtma ve türev çalışma üretme yasaktır (bkz. LICENSE).
import React from "react";
import ReactDOM from "react-dom/client";
import MainMenu from "./components/MainMenu";
import { installContentGuard } from "./security/contentGuard";
import {
  consumeMainMenuRequest,
  getSavedTargetLang,
  getTargetLang,
  type TargetLang,
} from "./content/activeLanguage";

/**
 * DilKoç açılış zinciri:
 *  1) Ana menü isteği var mı / kayıtlı dil seçilmiş mi?
 *     - Ana menü gerekiyorsa 🏠 ANA MENÜ (dil seçimi) gösterilir.
 *     - Dil seçilmişse App yalnızca O AN dinamik olarak yüklenir; böylece
 *       tüm müfredat modülleri (PATH, TOPICS_100, UNITS_DATA...) seçilen
 *       dile göre kurulur.
 *  2) Menüden dil seçilince seçim kaydedilir ve sayfa yenilenir.
 */
function Root() {
  const [lang, setLang] = React.useState<TargetLang | null>(() => {
    const forcedMenu = consumeMainMenuRequest();
    if (forcedMenu) return null; // kullanıcı ana menüye dönmek istedi
    return getSavedTargetLang();
  });
  const [App, setApp] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    if (lang) {
      // Aktif dili şimdi kilitle (veri modülleri import sırasında okur).
      import("./App").then((mod) => {
        if (!cancelled) setApp(() => mod.default);
      });
    }
    return () => { cancelled = true; };
  }, [lang]);

  const handleChoose = React.useCallback((chosen: TargetLang) => {
    setLang(chosen);
  }, []);

  /** Ana menüden GERİ DÖN: kayıtlı dil değiştirilmeden uygulamaya devam. */
  const handleContinue = React.useCallback((keep: TargetLang) => {
    setLang(keep);
  }, []);

  if (!lang) {
    return <MainMenu onChoose={handleChoose} onContinue={handleContinue} />;
  }

  if (!App) {
    // Dil seçildi, uygulama paketi yükleniyor — menü seçimini onaylayan küçük bir açılış ekranı
    const meta = lang === 'ru' ? '🇷🇺 Rusça' : '🇬🇧 İngilizce';
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', display: 'grid', placeItems: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>🎓</div>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{meta} Akademisi açılıyor…</div>
          <div style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>Müfredat hazırlanıyor — bir saniye sürer.</div>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Aktif dili main.tsx import zincirinin EN BAŞINDA sabitle (App dinamik
// yüklenmeden önce veri modülleri bu değeri okumuş olamaz; yine de güvenlik
// için burada bir kez daha bildirilir).
getTargetLang();

// İçerik koruma kalkanı: yalnız üretim derlemesinde (veya ?guard=on) etkin.
installContentGuard();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);

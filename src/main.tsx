import React from "react";
import ReactDOM from "react-dom/client";
import MainMenu from "./components/MainMenu";
import {
  consumeMainMenuRequest,
  getSavedTargetLang,
  getTargetLang,
  type TargetLang,
} from "./content/activeLanguage";

function Root() {
  const [lang, setLang] = React.useState<TargetLang | null>(() => {
    const forcedMenu = consumeMainMenuRequest();
    if (forcedMenu) return null;
    return getSavedTargetLang();
  });
  const [App, setApp] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    if (lang) {
      import("./App").then((mod) => {
        if (!cancelled) setApp(() => mod.default);
      });
    }
    return () => { cancelled = true; };
  }, [lang]);

  const handleChoose = React.useCallback((chosen: TargetLang) => {
    setLang(chosen);
  }, []);

  const handleContinue = React.useCallback((keep: TargetLang) => {
    setLang(keep);
  }, []);

  if (!lang) {
    return <MainMenu onChoose={handleChoose} onContinue={handleContinue} />;
  }

  if (!App) {
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

getTargetLang();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);

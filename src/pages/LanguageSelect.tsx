import { useNavigate } from "react-router-dom";
import { enConfig } from "../languages/en";
import { ruConfig } from "../languages/ru";
import { useActiveLanguage } from "../engine/LanguageContext";
import { getOrCreateProfile } from "../db/profileRepo";
import type { LanguageConfig } from "../engine/types";

const LANGUAGES: LanguageConfig[] = [enConfig, ruConfig];

const LABELS: Record<string, string> = {
  en: "İngilizce",
  ru: "Rusça",
};

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { setActiveLanguage } = useActiveLanguage();

  async function handleSelect(lang: LanguageConfig) {
    await getOrCreateProfile(lang.code); // creates row on first pick, reuses it after
    setActiveLanguage(lang.code);
    navigate(`/learn/${lang.code}`);
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Hangi dili öğrenmek istiyorsun?</h1>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang)}
            style={{
              padding: "16px 32px",
              fontSize: 18,
              borderRadius: 12,
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            {LABELS[lang.code] ?? lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
}

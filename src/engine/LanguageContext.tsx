import { createContext, useContext, useState, type ReactNode } from "react";
import type { LanguageCode } from "./types";

interface LanguageContextValue {
  activeLanguage: LanguageCode | null;
  setActiveLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [activeLanguage, setActiveLanguage] = useState<LanguageCode | null>(null);
  return (
    <LanguageContext.Provider value={{ activeLanguage, setActiveLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useActiveLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useActiveLanguage must be used within LanguageProvider");
  return ctx;
}

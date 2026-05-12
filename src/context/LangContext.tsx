"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { strings, type Lang, type StringKey } from "@/lib/strings";

type LangContextValue = {
  lang: Lang;
  t: (key: StringKey) => string;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  t: (key) => strings.en[key],
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("weddingLang") as Lang | null;
      if (saved === "en" || saved === "it") {
        setLang(saved);
        return;
      }
    } catch {}
    const browser = navigator.language.substring(0, 2);
    setLang(browser === "it" ? "it" : "en");
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "it" : "en";
      try {
        localStorage.setItem("weddingLang", next);
      } catch {}
      return next;
    });
  };

  const t = (key: StringKey): string => strings[lang][key];

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

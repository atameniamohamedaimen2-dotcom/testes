import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import en from "./en.json";

const AVAILABLE_LOCALES = ["en"] as const;
export type Locale = (typeof AVAILABLE_LOCALES)[number];

type Messages = typeof en;

function getByPath(obj: unknown, keyPath: string): unknown {
  const parts = keyPath.split(".").filter(Boolean);
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = cur[p];
  }
  return cur;
}

function resolveString(messages: Messages, keyPath: string): string {
  const v = getByPath(messages, keyPath);
  return typeof v === "string" ? v : keyPath;
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (keyPath: string) => string;
  get: (keyPath: string) => unknown;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? "en");

  const setLocale = (next: Locale) => {
    setLocaleState(next);
  };

  const messages = en;
  const t = useMemo(() => (keyPath: string) => resolveString(messages, keyPath), [messages]);
  const get = useMemo(() => (keyPath: string) => getByPath(messages, keyPath), [messages]);

  const dir = "ltr";

  return (
    <>
      <Helmet htmlAttributes={{ lang: locale, dir }} />
      <I18nContext.Provider value={{ locale, setLocale, t, get }}>{children}</I18nContext.Provider>
    </>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

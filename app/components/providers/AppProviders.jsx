"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { applyTheme, getPreferredTheme } from "@/lib/theme";
import { defaultLocale, getStoredLocale, LOCALE_KEY, locales } from "@/lib/i18n/config";
import es from "@/lib/i18n/es.json";
import en from "@/lib/i18n/en.json";
import it from "@/lib/i18n/it.json";

const messages = { es, en, it };

const ThemeCtx = createContext(null);
const I18nCtx = createContext(null);

export function AppProviders({ children }) {
  const [theme, setThemeState] = useState("light");
  const [locale, setLocaleState] = useState(defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = getPreferredTheme();
    applyTheme(t);
    setThemeState(t);
    setLocaleState(getStoredLocale());
    setReady(true);
  }, []);

  const setTheme = useCallback((next) => {
    const applied = applyTheme(next);
    setThemeState(applied);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const setLocale = useCallback((next) => {
    const loc = locales.includes(next) ? next : defaultLocale;
    setLocaleState(loc);
    try {
      localStorage.setItem(LOCALE_KEY, loc);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = loc;
  }, []);

  const t = useMemo(() => messages[locale] || messages.es, [locale]);

  const themeValue = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === "dark", ready }),
    [theme, setTheme, toggleTheme, ready]
  );

  const i18nValue = useMemo(
    () => ({ locale, setLocale, t, ready }),
    [locale, setLocale, t, ready]
  );

  return (
    <ThemeCtx.Provider value={themeValue}>
      <I18nCtx.Provider value={i18nValue}>
        <LayoutGroup>{children}</LayoutGroup>
      </I18nCtx.Provider>
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within AppProviders");
  return ctx;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within AppProviders");
  return ctx;
}

export const locales = ["es", "en", "it"];
export const defaultLocale = "es";
export const LOCALE_KEY = "locale";

export const localeMeta = {
  es: { label: "Español", flag: "🇩🇴", name: "ES" },
  en: { label: "English", flag: "🇺🇸", name: "EN" },
  it: { label: "Italiano", flag: "🇮🇹", name: "IT" },
};

export function getStoredLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (locales.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  return defaultLocale;
}

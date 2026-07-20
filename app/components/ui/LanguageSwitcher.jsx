"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { localeMeta, locales } from "@/lib/i18n/config";
import { useI18n } from "@/app/components/providers/AppProviders";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const current = localeMeta[locale];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm font-medium text-[var(--fg)] transition active:scale-95 hover:border-[var(--accent)]"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.name}</span>
        <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-[70] mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] py-1 shadow-[var(--shadow)]"
        >
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <button
                type="button"
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-[var(--accent-soft)] ${
                  code === locale ? "text-[var(--accent)] font-semibold" : "text-[var(--fg)]"
                }`}
              >
                <span aria-hidden>{localeMeta[code].flag}</span>
                {localeMeta[code].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

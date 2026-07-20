"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/app/components/providers/AppProviders";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import LanguageSwitcher from "@/app/components/ui/LanguageSwitcher";
import { LCS_LOGO, LCS_NAME, LCS_URL } from "@/lib/brand";

export default function Navbar() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeHash, setActiveHash] = useState("#home");

  const menuItems = [
    { label: t.nav.home, href: "/#home" },
    { label: t.nav.about, href: "/#aboutme" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.work, href: "/#work" },
    { label: t.nav.skills, href: "/#skills" },
    { label: t.nav.contact, href: "/#contactme" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "aboutme", "services", "work", "skills", "contactme"];
    const onScroll = () => {
      let current = "#home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = `#${id}`;
      }
      setActiveHash(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed top-3 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-medium text-white shadow-lg sm:text-sm"
          >
            {t.nav.welcome}
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <a
            href={LCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-50 flex items-center gap-2.5 transition hover:opacity-90 active:scale-95 sm:gap-3"
            onClick={() => setMenuOpen(false)}
            aria-label={`${LCS_NAME} — sitio oficial`}
          >
            <Image
              src={LCS_LOGO}
              alt={LCS_NAME}
              width={72}
              height={72}
              priority
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight text-[var(--fg)]">
                Logic Code Spot
              </span>
              <span className="text-[10px] font-medium tracking-wide text-[var(--fg-muted)]">
                Software Solutions
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {menuItems.map((item) => {
              const hash = item.href.replace("/", "");
              const isActive = activeHash === hash;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative rounded-full px-3 py-2 text-sm transition ${
                      isActive
                        ? "font-medium text-[var(--accent)]"
                        : "text-[var(--fg-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative z-50 flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 z-40 flex h-dvh w-[min(20rem,85vw)] flex-col gap-6 border-l border-[var(--border)] bg-[var(--bg-elevated)] px-6 pt-24 pb-8 lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-semibold text-[var(--fg)] transition hover:text-[var(--accent)] active:scale-95"
                >
                  {item.label}
                </a>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

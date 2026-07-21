"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  Code2,
  FolderKanban,
  Home,
  Linkedin,
  Mail,
  Menu,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { useI18n } from "@/app/components/providers/AppProviders";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import LanguageSwitcher from "@/app/components/ui/LanguageSwitcher";
import { LCS_LOGO, LCS_NAME, LCS_URL, SOCIAL } from "@/lib/brand";
import { useScrollLock } from "@/lib/useScrollLock";

const NAV_ICONS = [Home, User, Briefcase, FolderKanban, Code2, Mail];

export default function Navbar() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeHash, setActiveHash] = useState("#home");
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);

  useScrollLock(menuOpen);

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
    const onEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      const id = window.setTimeout(() => menuBtnRef.current?.focus?.(), 0);
      return () => window.clearTimeout(id);
    }
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusables = drawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus?.();

    const onTab = (e) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus?.();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus?.();
      }
    };
    drawer.addEventListener("keydown", onTab);
    return () => drawer.removeEventListener("keydown", onTab);
  }, [menuOpen]);

  const year = new Date().getFullYear();
  const closeMenu = () => setMenuOpen(false);

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
            onClick={closeMenu}
            aria-label={`${LCS_NAME} — sitio oficial`}
          >
            <Image
              src={LCS_LOGO}
              alt={LCS_NAME}
              width={80}
              height={80}
              priority
              className="h-14 w-14 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14"
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
            <div className="hidden sm:contents">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {/* Solo hamburguesa en header — la X vive únicamente en el drawer */}
            {!menuOpen && (
              <button
                ref={menuBtnRef}
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] lg:hidden"
                aria-label="Abrir menú"
                aria-expanded={false}
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
            )}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            <motion.aside
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 z-[45] flex h-dvh w-[min(21rem,88vw)] flex-col border-l border-[var(--border)] bg-[var(--bg-elevated)]/95 backdrop-blur-xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
            >
              <div className="flex items-center gap-3 border-b border-white/5 px-4 py-4">
                <a
                  href={LCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 flex-1 items-center gap-2.5"
                  onClick={closeMenu}
                  aria-label={LCS_NAME}
                >
                  <Image
                    src={LCS_LOGO}
                    alt=""
                    width={56}
                    height={56}
                    className="h-12 w-12 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-col leading-tight sm:flex">
                    <span className="block truncate text-sm font-semibold text-[var(--fg)]">
                      Logic Code Spot
                    </span>
                    <span className="block truncate text-[10px] tracking-wide text-[var(--fg-muted)]">
                      Software Solutions
                    </span>
                  </span>
                </a>
                <div className="flex shrink-0 items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)]"
                    aria-label="Cerrar menú"
                    onClick={closeMenu}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
                <ul className="flex flex-col">
                  {menuItems.map((item, i) => {
                    const hash = item.href.replace("/", "");
                    const isActive = activeHash === hash;
                    const Icon = NAV_ICONS[i] || Home;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.28 }}
                        className="border-b border-white/5 last:border-0"
                      >
                        <a
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex min-h-14 items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition ${
                            isActive
                              ? "bg-[var(--accent-soft)] text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--accent)]"
                              : "text-[var(--fg)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                          }`}
                        >
                          <Icon size={18} className="shrink-0" aria-hidden />
                          {item.label}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div
                className="mt-auto border-t border-white/5 px-5 pt-4"
                style={{
                  paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
                }}
              >
                <ul className="mb-3 flex items-center justify-center gap-3">
                  <li>
                    <a
                      href={SOCIAL.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                    >
                      <SiGithub size={18} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                    >
                      <Linkedin size={18} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={SOCIAL.email}
                      aria-label="Email"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                    >
                      <Mail size={18} />
                    </a>
                  </li>
                </ul>
                <p className="text-center text-[11px] text-[var(--fg-muted)]/70">
                  © {year} Logic Code Spot. Todos los derechos reservados.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

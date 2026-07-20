"use client";

import Image from "next/image";
import {
  Building2,
  Check,
  ChevronRight,
  Code2,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Server,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { useI18n } from "@/app/components/providers/AppProviders";
import { LCS_LOGO, LCS_NAME, LCS_URL, SOCIAL } from "@/lib/brand";
import FooterDoves from "@/app/components/ui/FooterDoves";

const SERVICE_ICONS = [Globe, Server, ShoppingCart, Building2, Code2, Rocket];

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const c = t.contact;
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.home, href: "/#home" },
    { label: t.nav.about, href: "/#aboutme" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.work, href: "/#work" },
    { label: t.nav.skills, href: "/#skills" },
    { label: t.nav.contact, href: "/#contactme" },
  ];

  const serviceLinks = (f.services || []).map((label, i) => ({
    label,
    Icon: SERVICE_ICONS[i % SERVICE_ICONS.length],
    href: "/#services",
  }));

  const socials = [
    { href: SOCIAL.github, label: "GitHub", Icon: SiGithub },
    { href: SOCIAL.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: SOCIAL.whatsapp, label: "WhatsApp", Icon: SiWhatsapp },
    { href: SOCIAL.email, label: "Email", Icon: Mail },
  ];

  const pillIcons = [Code2, Sparkles, Rocket];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <FooterDoves />

      <div className="relative z-[1] mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:px-8">
        <div className="lg:col-span-1">
          <a
            href={LCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 transition hover:opacity-90"
            aria-label={`${LCS_NAME} — sitio oficial`}
          >
            <Image
              src={LCS_LOGO}
              alt={LCS_NAME}
              width={56}
              height={56}
              className="h-12 w-12 object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[var(--fg)]">
                Logic Code Spot
              </span>
              <span className="text-[10px] text-[var(--fg-muted)]">
                Software Solutions
              </span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)]">
            {f.mission}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon size={16} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--fg)]">{f.navTitle}</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] transition hover:text-[var(--accent)]"
                >
                  <ChevronRight size={14} className="text-[var(--accent)]" aria-hidden />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--fg)]">{f.servicesTitle}</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map(({ label, Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] transition hover:text-[var(--accent)]"
                >
                  <Icon size={14} className="text-[var(--accent)]" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--fg)]">{f.focusTitle}</h3>
          <ul className="mt-4 space-y-2.5">
            {(f.focus || []).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-[var(--fg-muted)]"
              >
                <Check size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--fg)]">{f.contactTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--fg-muted)]">
            <li>
              <a
                href={`mailto:${c.emailValue}`}
                className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
              >
                <Mail size={14} className="text-[var(--accent)]" aria-hidden />
                {c.emailValue}
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-[var(--accent)]"
              >
                <Phone size={14} className="text-[var(--accent)]" aria-hidden />
                {c.phone}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {c.location}
            </li>
            <li className="text-xs leading-relaxed">{f.hours}</li>
          </ul>
        </div>
      </div>

      <div className="relative z-[1] border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-5 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
          <p className="text-xs text-[var(--fg-muted)] sm:text-sm">
            © {year} {f.brand}. {f.rights}
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-2">
            {(f.pills || []).map((pill, i) => {
              const Icon = pillIcons[i] || Sparkles;
              return (
                <li
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--fg-muted)]"
                >
                  <Icon size={11} className="text-[var(--accent)]" aria-hidden />
                  {pill}
                </li>
              );
            })}
          </ul>

          <ul className="flex items-center gap-4 text-xs text-[var(--fg-muted)]">
            <li>
              <a href="#privacy" className="transition hover:text-[var(--accent)]">
                {f.privacy}
              </a>
            </li>
            <li>
              <a href="#terms" className="transition hover:text-[var(--accent)]">
                {f.terms}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

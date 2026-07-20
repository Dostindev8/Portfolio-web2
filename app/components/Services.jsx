"use client";

import {
  Globe,
  Server,
  ShoppingCart,
  Building2,
  Bot,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useI18n } from "@/app/components/providers/AppProviders";
import SectionReveal from "@/app/components/ui/SectionReveal";

const ICON_MAP = {
  Globe,
  Server,
  ShoppingCart,
  Building2,
  Bot,
  ShieldCheck,
};

const DEFAULT_ICONS = ["Globe", "Server", "ShoppingCart", "Building2", "Bot", "ShieldCheck"];

export default function Services() {
  const { t } = useI18n();
  const s = t.services;

  return (
    <section id="services" className="section-pad bg-[var(--bg-elevated)]/50">
      <SectionReveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {s.eyebrow}
        </p>
        <h2 className="mt-2 text-center font-display text-fluid-h2 text-[var(--fg)]">
          {s.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-fluid-body text-[var(--fg-muted)]">
          {s.subtitle}
        </p>
      </SectionReveal>

      <div className="mx-auto mt-12 grid max-w-6xl auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item, i) => {
          const iconKey = item.icon || DEFAULT_ICONS[i] || "Globe";
          const Icon = ICON_MAP[iconKey] || Globe;
          return (
            <SectionReveal key={item.title} delay={0.05 * i} className="h-full">
              <article className="flex h-full min-h-[17.5rem] flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[var(--shadow)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {item.desc}
                </p>
                <div className="mt-3 min-h-[1.75rem]">
                  {item.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <a
                  href="#contactme"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]"
                >
                  {s.learnMore}
                  <ArrowRight size={14} aria-hidden />
                </a>
              </article>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}

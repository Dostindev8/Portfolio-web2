"use client";

import {
  Code2,
  FolderKanban,
  Layers,
  Rocket,
} from "lucide-react";
import { useI18n } from "@/app/components/providers/AppProviders";
import SectionReveal from "@/app/components/ui/SectionReveal";
import SkillBadge from "@/app/components/ui/SkillBadge";

const CAT_COLORS = [
  "text-blue-500 bg-blue-500/10",
  "text-sky-500 bg-sky-500/10",
  "text-violet-500 bg-violet-500/10",
  "text-teal-500 bg-teal-500/10",
  "text-emerald-500 bg-emerald-500/10",
  "text-orange-500 bg-orange-500/10",
];

export default function Skills() {
  const { t } = useI18n();
  const s = t.skills;
  const stats = s.stats || [];

  const statIcons = [Code2, FolderKanban, Layers, Rocket];

  return (
    <section id="skills" className="section-pad bg-[var(--bg-elevated)]/60">
      <SectionReveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {s.eyebrow}
        </p>
        <h2 className="mt-2 text-center font-display text-fluid-h2 font-bold text-[var(--fg)]">
          {s.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-fluid-body text-[var(--fg-muted)]">
          {s.subtitle}
        </p>
      </SectionReveal>

      <div className="mx-auto mt-12 grid max-w-6xl auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {s.categories.map((cat, i) => (
          <SectionReveal key={cat.name} delay={0.05 * i} className="h-full">
            <div className="flex h-full min-h-[11rem] flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${CAT_COLORS[i % CAT_COLORS.length]}`}
              >
                <Code2 size={16} aria-hidden />
              </div>
              <h3 className="mb-4 font-display text-lg font-semibold text-[var(--fg)]">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <SkillBadge key={item}>{item}</SkillBadge>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

      {stats.length > 0 && (
        <SectionReveal delay={0.15}>
          <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:grid-cols-4 sm:gap-4 sm:p-5">
            {stats.map((stat, i) => {
              const Icon = statIcons[i] || Rocket;
              return (
                <li
                  key={stat}
                  className="flex items-center gap-2.5 rounded-xl px-2 py-2 sm:justify-center"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={15} aria-hidden />
                  </span>
                  <span className="text-xs font-medium text-[var(--fg)] sm:text-sm">
                    {stat}
                  </span>
                </li>
              );
            })}
          </ul>
        </SectionReveal>
      )}
    </section>
  );
}

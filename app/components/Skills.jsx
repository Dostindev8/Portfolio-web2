"use client";

import { Code2, FolderKanban, Layers, Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/app/components/providers/AppProviders";
import SectionReveal from "@/app/components/ui/SectionReveal";
import SkillBadge from "@/app/components/ui/SkillBadge";

const CAT_META = [
  {
    icon: "text-blue-400 bg-blue-500/15",
    glow: "bg-blue-500/40",
    hover:
      "hover:border-blue-400/40 hover:text-blue-300 hover:shadow-[0_0_16px_rgba(59,130,246,0.35)]",
  },
  {
    icon: "text-sky-400 bg-sky-500/15",
    glow: "bg-sky-500/40",
    hover:
      "hover:border-sky-400/40 hover:text-sky-300 hover:shadow-[0_0_16px_rgba(56,189,248,0.35)]",
  },
  {
    icon: "text-violet-400 bg-violet-500/15",
    glow: "bg-violet-500/40",
    hover:
      "hover:border-violet-400/40 hover:text-violet-300 hover:shadow-[0_0_16px_rgba(139,92,246,0.35)]",
  },
  {
    icon: "text-teal-400 bg-teal-500/15",
    glow: "bg-teal-500/40",
    hover:
      "hover:border-teal-400/40 hover:text-teal-300 hover:shadow-[0_0_16px_rgba(45,212,191,0.35)]",
  },
  {
    icon: "text-emerald-400 bg-emerald-500/15",
    glow: "bg-emerald-500/40",
    hover:
      "hover:border-emerald-400/40 hover:text-emerald-300 hover:shadow-[0_0_16px_rgba(52,211,153,0.35)]",
  },
  {
    icon: "text-orange-400 bg-orange-500/15",
    glow: "bg-orange-500/40",
    hover:
      "hover:border-orange-400/40 hover:text-orange-300 hover:shadow-[0_0_16px_rgba(251,146,60,0.35)]",
  },
];

export default function Skills() {
  const { t } = useI18n();
  const s = t.skills;
  const stats = s.stats || [];
  const reduceMotion = useReducedMotion();
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

      <div className="mx-auto mt-12 grid max-w-6xl auto-rows-fr items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {s.categories.map((cat, i) => {
          const meta = CAT_META[i % CAT_META.length];
          return (
            <motion.div
              key={cat.name}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={`h-full ${reduceMotion ? "" : "skill-card-float"}`}
                style={
                  reduceMotion
                    ? undefined
                    : { animationDelay: `${i * 0.4}s` }
                }
              >
                <div className="group relative flex h-full min-h-[12rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg shadow-blue-500/5 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:shadow-blue-500/20 dark:bg-white/[0.04]">
                  <div className="relative mb-3">
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-lg blur-md ${meta.glow} ${
                        reduceMotion ? "" : "skill-icon-glow"
                      }`}
                    />
                    <div
                      className={`relative flex h-9 w-9 items-center justify-center rounded-lg ${meta.icon}`}
                    >
                      <Code2 size={16} aria-hidden />
                    </div>
                  </div>

                  <h3 className="relative mb-4 font-display text-lg font-semibold text-[var(--fg)]">
                    {cat.name}
                  </h3>
                  <div className="relative flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <SkillBadge key={item} accentClass={meta.hover}>
                        {item}
                      </SkillBadge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {stats.length > 0 && (
        <SectionReveal delay={0.15}>
          <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/80 p-4 backdrop-blur-sm sm:grid-cols-4 sm:gap-4 sm:p-5">
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

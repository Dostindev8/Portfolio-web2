"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { useI18n } from "@/app/components/providers/AppProviders";
import SectionReveal from "@/app/components/ui/SectionReveal";
import LiveTerminal from "@/app/components/ui/LiveTerminal";

export default function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="aboutme" className="section-pad">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <SectionReveal>
          <LiveTerminal liveLabel={a.terminalLive || "live"} />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {a.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-fluid-h2 font-bold text-[var(--fg)]">
            {a.title}
          </h2>
          <p className="mt-4 text-fluid-body text-[var(--fg-muted)]">{a.bio}</p>
          {a.bio2 && (
            <p className="mt-3 text-fluid-body text-[var(--fg-muted)]">{a.bio2}</p>
          )}
          <ul className="mt-6 space-y-3">
            {(a.bullets || []).map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--fg)]">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
          <a
            href="#work"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:gap-3"
          >
            {a.more || "More"}
            <ArrowRight size={16} aria-hidden />
          </a>
        </SectionReveal>
      </div>

      <SectionReveal delay={0.12}>
        <div className="mx-auto mt-14 max-w-6xl">
          <h3 className="font-display text-xl font-semibold text-[var(--fg)]">
            {a.experienceTitle}
          </h3>
          <ol className="mt-5 space-y-5 border-l border-[var(--border)] pl-5">
            {a.experience.map((job) => (
              <li key={job.org + job.period} className="relative">
                <span className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <p className="font-semibold text-[var(--fg)]">{job.role}</p>
                <p className="text-sm text-[var(--accent)]">
                  {job.org} · {job.period}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--fg-muted)]">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </SectionReveal>
    </section>
  );
}

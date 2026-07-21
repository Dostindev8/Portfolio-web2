"use client";

import { useMemo, useState } from "react";
import { projects, filterToCategories } from "@/lib/projects";
import { useI18n } from "@/app/components/providers/AppProviders";
import SectionReveal from "@/app/components/ui/SectionReveal";
import ProjectCard from "@/app/components/ui/ProjectCard";

export default function Work() {
  const { t, locale } = useI18n();
  const w = t.work;
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: w.filters?.all || "All" },
    { key: "web", label: w.filters?.web || "Web" },
    { key: "ecommerce", label: w.filters?.ecommerce || "E-commerce" },
    { key: "saas", label: w.filters?.saas || "SaaS" },
    { key: "systems", label: w.filters?.systems || "Systems" },
  ];

  const filtered = useMemo(() => {
    const map = filterToCategories[filter];
    if (!map || map === "all") return projects;
    return projects.filter((p) => map.includes(p.category));
  }, [filter]);

  return (
    <section id="work" className="section-pad">
      <SectionReveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {w.eyebrow}
        </p>
        <h2 className="mt-2 text-center font-display text-fluid-h2 font-bold">
          {w.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-fluid-body text-[var(--fg-muted)]">
          {w.subtitle}
        </p>
      </SectionReveal>

      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
              filter === f.key
                ? "bg-[var(--accent)] text-white shadow-md"
                : "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <SectionReveal key={project.slug} delay={0.04 * Math.min(i, 5)}>
            <ProjectCard
              project={project}
              viewLabel={w.viewDetails}
              consultLabel={w.consult || "Consultar"}
              locale={locale}
              priority={i < 2}
            />
          </SectionReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-[var(--fg-muted)]">—</p>
      )}
    </section>
  );
}

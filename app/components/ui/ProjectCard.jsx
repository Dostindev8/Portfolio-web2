"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { BLUR_DATA_URL, categoryLabels, localizeProject } from "@/lib/projects";
import { whatsappHref } from "@/lib/brand";

export default function ProjectCard({
  project,
  viewLabel,
  consultLabel = "Consultar",
  locale = "es",
  priority = false,
}) {
  const localized = localizeProject(project, locale);
  const category =
    categoryLabels[project.category]?.[locale] ||
    categoryLabels[project.category]?.es ||
    project.category;
  const extra = Math.max(0, project.stack.length - 3);
  const accent = project.accentColor;
  const demoUrl = project.links?.demo?.trim();
  const hasDemo = Boolean(demoUrl);
  const href = hasDemo
    ? demoUrl
    : whatsappHref(
        `Hola Dostin, vi el proyecto ${project.name} en tu portfolio y quiero más información.`,
      );
  const ctaLabel = hasDemo ? viewLabel : consultLabel;
  const CtaIcon = hasDemo ? ArrowUpRight : MessageCircle;

  return (
    <motion.article
      className="project-card group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:ring-white/5"
      style={{ "--project-accent": accent }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--project-accent)]"
        aria-label={`${ctaLabel}: ${project.name}`}
      >
        <div className="relative aspect-[16/10] w-full bg-[var(--bg)] p-2 sm:p-3">
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={project.coverImage}
              alt={`Portada del proyecto ${project.name}`}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-contain transition duration-500 group-hover:scale-[1.02]"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={priority}
            />
          </div>
          <span
            className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
            style={{ backgroundColor: `${accent}ee` }}
          >
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 pt-3">
          <h3 className="font-display text-lg font-bold text-[var(--fg)]">
            {project.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-[var(--fg-muted)]">
            {localized.tagline}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: `${accent}22`, color: accent }}
              >
                {tag}
              </span>
            ))}
            {extra > 0 && (
              <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]">
                +{extra}
              </span>
            )}
          </div>

          <span className="project-cta mt-auto inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95 pt-5">
            <span>{ctaLabel}</span>
            <CtaIcon
              size={16}
              className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </a>
    </motion.article>
  );
}

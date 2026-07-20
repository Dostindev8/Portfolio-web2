"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Smile,
  Users,
  Code2,
  Clock,
  Shield,
  Rocket,
  Zap,
  X,
} from "lucide-react";
import {
  BLUR_DATA_URL,
  categoryLabels,
  localizeProject,
  type Project,
} from "@/lib/projects";
import { whatsappHref } from "@/lib/brand";
import { useI18n } from "@/app/components/providers/AppProviders";

type Props = { project: Project };

export default function ProjectDetail({ project }: Props) {
  const { locale, t } = useI18n();
  const localized = localizeProject(project, locale);
  const category =
    categoryLabels[project.category]?.[locale as "es" | "en" | "it"] ||
    categoryLabels[project.category].es;
  const accent = project.accentColor;
  const w = t.work;

  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => {
    setLightbox((i) =>
      i === null ? null : (i + 1) % project.gallery.length
    );
  }, [project.gallery.length]);
  const prev = useCallback(() => {
    setLightbox((i) =>
      i === null
        ? null
        : (i - 1 + project.gallery.length) % project.gallery.length
    );
  }, [project.gallery.length]);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, next, prev]);

  const highlightFeatures = localized.features.slice(0, 4);
  const deliverables = [
    {
      icon: Shield,
      title: locale === "en" ? "Secure solutions" : locale === "it" ? "Soluzioni sicure" : "Soluciones seguras",
      desc:
        locale === "en"
          ? "JWT, RBAC and security-by-design from day one."
          : locale === "it"
            ? "JWT, RBAC e security-by-design fin dal primo giorno."
            : "JWT, RBAC y security-by-design desde el día uno.",
      color: accent,
    },
    {
      icon: Rocket,
      title: locale === "en" ? "Real scalability" : locale === "it" ? "Scalabilità reale" : "Escalabilidad real",
      desc:
        locale === "en"
          ? "Architectures ready to grow with your business."
          : locale === "it"
            ? "Architetture pronte a crescere con il tuo business."
            : "Arquitecturas listas para crecer con tu negocio.",
      color: "#3B82F6",
    },
    {
      icon: Zap,
      title: locale === "en" ? "Optimal performance" : locale === "it" ? "Performance ottimale" : "Rendimiento óptimo",
      desc:
        locale === "en"
          ? "Fast interfaces and efficient APIs in production."
          : locale === "it"
            ? "Interfacce veloci e API efficienti in produzione."
            : "Interfaces rápidas y APIs eficientes en producción.",
      color: "#F59E0B",
    },
  ];

  const stats = [
    { icon: Smile, value: "20+", label: w.stats?.clients },
    { icon: Users, value: "35+", label: w.stats?.delivered },
    { icon: Code2, value: "50K+", label: w.stats?.lines },
    { icon: Clock, value: "99%", label: w.stats?.uptime },
  ];

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <Link
          href="/#work"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-80"
          style={{ color: accent }}
        >
          <ArrowLeft size={16} aria-hidden />
          {w.back}
        </Link>

        {/* Split hero — text left / image right (mockup 3) */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                style={{ backgroundColor: accent }}
              >
                {category}
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--fg-muted)]">
                {project.year}
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--fg-muted)]">
                {w.role}: {project.role}
              </span>
            </div>

            <h1 className="mt-5 font-display text-fluid-h2 font-bold">
              {project.name}
            </h1>
            <p className="mt-2 text-lg font-medium" style={{ color: accent }}>
              {localized.tagline}
            </p>
            <p className="mt-4 text-fluid-body text-[var(--fg-muted)]">
              {localized.description}
            </p>

            <ul className="mt-6 space-y-3">
              {highlightFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--fg)]">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: accent }}
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links?.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition active:scale-95"
                  style={{ backgroundColor: accent }}
                >
                  {w.viewSite}
                  <ArrowRight size={14} aria-hidden />
                </a>
              ) : null}
              {project.links?.whatsapp ? (
                <a
                  href={whatsappHref(
                    `Hola Dostin, vi el proyecto ${project.name} en tu portfolio y quisiera cotizar algo similar.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)] active:scale-95"
                >
                  WhatsApp <MessageCircle size={14} aria-hidden />
                </a>
              ) : null}
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)] active:scale-95"
              >
                {w.viewOthers}
              </Link>
            </div>
          </div>

          <motion.div layoutId={`project-card-${project.slug}`}>
            <div
              className="relative w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow)] sm:p-4"
              style={{
                boxShadow: `0 20px 60px ${accent}33`,
              }}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={project.coverImage}
                  alt={`Visual completo de ${project.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width contain showcase (mockup 1) */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 sm:p-5">
          <div className="relative aspect-[21/9] w-full min-h-[200px] sm:min-h-[280px]">
            <Image
              src={project.coverImage}
              alt={`${project.name} — vista completa sin recorte`}
              fill
              sizes="100vw"
              className="object-contain"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-center shadow-sm"
            >
              <s.icon
                size={20}
                className="mx-auto mb-2"
                style={{ color: accent }}
                aria-hidden
              />
              <p className="font-display text-xl font-bold sm:text-2xl">{s.value}</p>
              <p className="mt-1 text-xs text-[var(--fg-muted)] sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tech */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{w.techUsed}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{w.deliverables}</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {deliverables.map((d) => (
              <article
                key={d.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5"
              >
                <d.icon size={22} style={{ color: d.color }} aria-hidden />
                <h3 className="mt-3 font-semibold text-[var(--fg)]">{d.title}</h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">{d.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Full features + gallery */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{w.features}</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {localized.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{ color: accent }}
                  aria-hidden
                />
                <span className="text-sm text-[var(--fg-muted)]">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold">{w.gallery}</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setLightbox(i)}
                className="relative aspect-video overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-2 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <Image
                  src={src}
                  alt={`${project.name} — imagen ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </button>
            ))}
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--border)] pt-8">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              Demo <ExternalLink size={14} aria-hidden />
            </a>
          )}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
          >
            <ArrowLeft size={14} aria-hidden />
            {w.back}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label={w.close}
              onClick={closeLightbox}
            />
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white"
              aria-label={w.close}
            >
              <X size={20} />
            </button>
            {project.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 z-10 rounded-full bg-white/10 p-2 text-white sm:left-6"
                  aria-label="Prev"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 z-10 rounded-full bg-white/10 p-2 text-white sm:right-6"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <div className="relative z-[1] h-[75vh] w-full max-w-5xl">
              <Image
                src={project.gallery[lightbox]}
                alt={`${project.name} lightbox`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

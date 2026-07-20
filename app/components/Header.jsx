"use client";

import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import { useI18n } from "@/app/components/providers/AppProviders";
import TechOrbit from "@/app/components/ui/TechOrbit";
import TechMarquee, {
  MARQUEE_ROW_A,
  MARQUEE_ROW_B,
} from "@/app/components/ui/TechMarquee";

export default function Header() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section id="home" className="relative overflow-x-clip overflow-y-visible pt-24 pb-10 sm:pt-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] sm:text-sm">
            {h.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-fluid-hero font-bold text-[var(--fg)]">
            {h.headline}{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-blue-600 to-violet-500 bg-clip-text text-transparent">
              {h.headlineAccent}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-fluid-body text-[var(--fg-muted)] lg:mx-0">
            {h.sub}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[var(--accent-hover)] active:scale-95"
            >
              {h.ctaPrimary}
              <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href="#contactme"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-[var(--fg)] transition hover:text-[var(--accent)] active:scale-95"
            >
              <Plus size={16} className="text-[var(--accent)]" aria-hidden />
              {h.ctaSecondary}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 relative mx-auto flex w-full max-w-lg items-center justify-center overflow-visible lg:order-2 lg:max-w-none"
        >
          <div className="relative aspect-square w-[min(100%,20rem)] overflow-visible sm:w-[24rem]">
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-400/10 to-violet-500/20 blur-2xl" />
            <div className="absolute inset-[12%] rounded-full border border-blue-400/30" />
            <div className="absolute inset-[18%] rounded-full border border-indigo-400/20" />

            <TechOrbit />

            <div className="absolute inset-[26%] z-[6] overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-neutral-800">
              <Image
                src={assets.profile_img}
                alt={h.name}
                fill
                priority
                sizes="(max-width: 640px) 220px, 280px"
                className="object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-1 left-1/2 z-20 w-[min(100%,17rem)] -translate-x-1/2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow)] sm:left-auto sm:right-0 sm:translate-x-0 sm:w-52">
              <ul className="space-y-1.5 text-left text-xs sm:text-sm">
                <li className="font-semibold text-[var(--fg)]">{h.stats.years}</li>
                <li className="text-[var(--fg-muted)]">{h.stats.projects}</li>
                <li className="font-medium text-[var(--accent)]">{h.stats.clients}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-5 shadow-[var(--shadow)] sm:px-4 sm:py-6">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
            {h.techTitle}
          </p>
          <div className="space-y-3">
            <TechMarquee items={MARQUEE_ROW_A} direction="left" speed={38} />
            <TechMarquee items={MARQUEE_ROW_B} direction="right" speed={42} />
          </div>
        </div>
      </div>
    </section>
  );
}

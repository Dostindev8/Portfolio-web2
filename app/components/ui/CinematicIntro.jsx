"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiThreedotjs,
  SiPrisma,
} from "react-icons/si";
import { assets } from "@/assets/assets";
import { useI18n } from "@/app/components/providers/AppProviders";

/** Fase 1: 0–3.5s órbita · Fase 2: 3.5–6s bienvenida · Fase 3: 6–7.5s disolución */
const T_ORBIT = 3500;
const T_WELCOME = 2500;
const T_DISSOLVE = 1500;
const CROSSFADE_AT = 0.8;

const GRID = 14;

const INTRO_LOGOS = [
  { Icon: SiReact, color: "#61DAFB", ring: 0 },
  { Icon: SiNextdotjs, color: "#ffffff", ring: 0 },
  { Icon: SiTypescript, color: "#3178C6", ring: 0 },
  { Icon: SiJavascript, color: "#F7DF1E", ring: 0 },
  { Icon: SiNodedotjs, color: "#339933", ring: 0 },
  { Icon: SiThreedotjs, color: "#ffffff", ring: 0 },
  { Icon: Sparkles, color: "#A78BFA", ring: 0, isLucide: true },
  { Icon: SiPrisma, color: "#5A67D8", ring: 0 },
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function useOrbitRadius() {
  const [radius, setRadius] = useState(108);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setRadius(Math.min(140, Math.max(82, w * 0.26)));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return radius;
}

/**
 * CinematicIntro — órbita HD, bienvenida y disolución en píxeles.
 * Sin fondo propio: AppBackground unificado en layout.
 */
export default function CinematicIntro({
  onDissolveStart,
  onCrossfade,
  onComplete,
  onSkip,
}) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const radius = useOrbitRadius();
  const [phase, setPhase] = useState("orbit");

  const particles = useMemo(() => {
    const rng = seededRandom(42);
    const total = GRID * GRID;
    return Array.from({ length: total }, (_, i) => ({
      i,
      order: Math.floor(rng() * total),
      dx: (rng() - 0.5) * 120,
      dy: (rng() - 0.5) * 120,
      rot: (rng() - 0.5) * 180,
      delay: rng() * 0.45,
    }));
  }, []);

  const finish = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (reduceMotion) {
      onSkip?.();
      return;
    }

    const timers = [
      setTimeout(() => setPhase("welcome"), T_ORBIT),
      setTimeout(() => {
        setPhase("dissolve");
        onDissolveStart?.();
      }, T_ORBIT + T_WELCOME),
      setTimeout(() => onCrossfade?.(), T_ORBIT + T_WELCOME + T_DISSOLVE * CROSSFADE_AT),
      setTimeout(() => finish(), T_ORBIT + T_WELCOME + T_DISSOLVE),
    ];

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion, onDissolveStart, onCrossfade, finish, onSkip]);

  const skipLabel = t.intro?.skip || "Saltar intro";
  const skipAria = t.intro?.skipAria || "Saltar animación de introducción";
  const name = t.intro?.name || t.hero?.name || "Dostin Santana";
  const role = t.intro?.role || "Fullstack Developer";
  const tagline = t.intro?.tagline || t.about?.title || "";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        aria-modal
        role="dialog"
        aria-label="Introducción"
      >
        <button
          type="button"
          onClick={() => onSkip?.()}
          aria-label={skipAria}
          className="absolute top-4 right-4 z-[110] rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/80 px-4 py-2 text-xs font-semibold text-[var(--fg)] opacity-60 shadow-md backdrop-blur-sm transition hover:border-[var(--accent)] hover:text-[var(--accent)] hover:opacity-100 sm:top-6 sm:right-6"
        >
          {skipLabel}
        </button>

        {phase === "dissolve" && (
          <div
            className="pointer-events-none absolute inset-0 z-[105] grid"
            style={{
              gridTemplateColumns: `repeat(${GRID}, 1fr)`,
              gridTemplateRows: `repeat(${GRID}, 1fr)`,
            }}
            aria-hidden
          >
            {particles
              .sort((a, b) => a.order - b.order)
              .map(({ i, dx, dy, rot, delay }) => (
                <motion.div
                  key={i}
                  className="bg-[var(--bg-elevated)]"
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0.15,
                    x: dx,
                    y: dy,
                    rotate: rot,
                  }}
                  transition={{
                    delay,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
          </div>
        )}

        <div
          className="relative flex flex-col items-center gap-6 px-6 sm:gap-8"
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative h-[min(72vw,16rem)] w-[min(72vw,16rem)] sm:h-64 sm:w-64"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{
              opacity: phase === "dissolve" ? 0 : 1,
              scale: phase === "dissolve" ? 0.92 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Anillos dobles */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full border border-[var(--accent)]/35"
              style={{ boxShadow: "0 0 32px rgba(59,130,246,0.25)" }}
            />
            <div className="pointer-events-none absolute inset-[6%] rounded-full border border-[var(--accent)]/20" />

            {/* Órbita — rotación GPU en contenedor padre */}
            <motion.div
              className="absolute inset-0"
              animate={
                phase === "dissolve" || reduceMotion
                  ? { rotate: 0 }
                  : { rotate: 360 }
              }
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "center center" }}
            >
              {INTRO_LOGOS.map(({ Icon, color, isLucide }, idx) => {
                const angle = (idx / INTRO_LOGOS.length) * 360;
                return (
                  <div
                    key={idx}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                    }}
                  >
                    <motion.div
                      className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 shadow-lg backdrop-blur-md sm:h-11 sm:w-11"
                      animate={
                        phase === "dissolve" || reduceMotion
                          ? { rotate: 0 }
                          : { rotate: -360 }
                      }
                      transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {isLucide ? (
                        <Icon size={18} color={color} aria-hidden />
                      ) : (
                        <Icon size={18} color={color} aria-hidden />
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            <div
              className="absolute inset-[22%] overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-neutral-700"
              style={{ boxShadow: "0 0 48px rgba(59,130,246,0.35)" }}
            >
              <Image
                src={assets.profile_img}
                alt={name}
                fill
                priority
                sizes="(max-width: 640px) 220px, 256px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {(phase === "welcome" || phase === "dissolve") && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: phase === "dissolve" ? 0 : 1,
                  y: phase === "dissolve" ? -8 : 0,
                }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md text-center"
              >
                <p className="font-display text-xl font-semibold text-[var(--fg)] sm:text-2xl">
                  {name}
                  <span className="text-[var(--fg-muted)]"> — </span>
                  <span className="text-[var(--accent)]">{role}</span>
                </p>
                {tagline && (
                  <p className="mt-2 text-sm text-[var(--fg-muted)] sm:text-base">
                    {tagline}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

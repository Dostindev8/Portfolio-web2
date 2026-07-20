"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiDotnet,
  SiMongodb,
  SiTailwindcss,
  SiAngular,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

export const ORBIT_TECHS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "currentColor" },
  { name: "C# / .NET", Icon: SiDotnet, color: "#512BD4" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "SQL Server", Icon: DiMsqlServer, color: "#CC2927" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Angular", Icon: SiAngular, color: "#DD0031" },
];

const MOBILE_KEYS = ["React", "Next.js", "TypeScript", "Node.js", "C# / .NET", "MongoDB"];

/**
 * TechOrbit — logos SVG reales orbitando la foto.
 * Contra-rotación para mantener los logos siempre verticales.
 */
export default function TechOrbit({
  items = ORBIT_TECHS,
  radiusDesktop = 148,
  radiusMobile = 108,
  duration = 36,
}) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);

  const mobileItems = useMemo(() => {
    if (items.length <= 6) return items;
    return items.filter((t) => MOBILE_KEYS.includes(t.name));
  }, [items]);

  const shared = { duration, reduceMotion, paused, setPaused, hovered, setHovered };

  return (
    <>
      <OrbitRing className="sm:hidden" items={mobileItems} radius={radiusMobile} badgeSize={38} {...shared} />
      <OrbitRing className="hidden sm:block" items={items} radius={radiusDesktop} badgeSize={44} {...shared} />
    </>
  );
}

function OrbitRing({
  items,
  radius,
  duration,
  reduceMotion,
  paused,
  setPaused,
  hovered,
  setHovered,
  badgeSize,
  className = "",
}) {
  const n = items.length;
  const spin = reduceMotion || paused;

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 z-[5] ${className}`}
      style={{ willChange: spin ? "auto" : "transform" }}
      animate={spin ? { rotate: 0 } : { rotate: 360 }}
      transition={spin ? { duration: 0.3 } : { duration, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      {items.map((tech, i) => {
        const angle = (360 / n) * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const { Icon } = tech;

        return (
          <motion.div
            key={tech.name}
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{
              width: badgeSize,
              height: badgeSize,
              marginLeft: -badgeSize / 2,
              marginTop: -badgeSize / 2,
              transform: `translate(${x}px, ${y}px)`,
            }}
            onMouseEnter={() => {
              setPaused(true);
              setHovered(tech.name);
            }}
            onMouseLeave={() => {
              setPaused(false);
              setHovered(null);
            }}
          >
            <motion.div
              animate={spin ? { rotate: 0 } : { rotate: -360 }}
              transition={spin ? { duration: 0.3 } : { duration, repeat: Infinity, ease: "linear" }}
              className="relative flex h-full w-full items-center justify-center"
            >
              <motion.span
                title={tech.name}
                animate={{ scale: hovered === tech.name ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-[var(--bg-elevated)] text-[var(--fg)] shadow-lg dark:border-white/10"
                style={{ boxShadow: `0 4px 14px ${tech.color === "currentColor" ? "rgba(0,0,0,0.25)" : tech.color + "44"}` }}
              >
                <Icon
                  size={Math.round(badgeSize * 0.55)}
                  color={tech.color === "currentColor" ? undefined : tech.color}
                  aria-label={tech.name}
                />
              </motion.span>
              {hovered === tech.name && (
                <span className="absolute -bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--fg)] px-2 py-0.5 text-[10px] font-medium text-[var(--bg)] shadow-md">
                  {tech.name}
                </span>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

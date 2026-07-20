"use client";

import Image from "next/image";
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
  SiGit,
  SiGithub,
  SiDocker,
  SiClaude,
  SiGooglegemini,
  SiCursor,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

function ChatGptIcon({ size = 16, className = "" }) {
  return (
    <Image
      src="/logos/chatgpt.svg"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
}

/** Row A — core stack (marquee left) */
export const MARQUEE_ROW_A = [
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

/** Row B — AI + DevOps (marquee right) */
export const MARQUEE_ROW_B = [
  { name: "Claude", Icon: SiClaude, color: "#D97757" },
  { name: "ChatGPT", Icon: ChatGptIcon, color: "#10A37F" },
  { name: "Gemini", Icon: SiGooglegemini, color: "#8E75B2" },
  { name: "Cursor", Icon: SiCursor, color: "currentColor" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "currentColor" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
];

/**
 * TechMarquee — cinta infinita CSS-only (duplica items, translateX -50%).
 */
export default function TechMarquee({
  items,
  direction = "left",
  speed = 40,
  className = "",
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`tech-marquee relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="tech-marquee-track flex w-max gap-3 sm:gap-4"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => {
          const { Icon, name, color } = item;
          const isImg = Icon === ChatGptIcon;
          return (
            <div
              key={`${name}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-xs font-medium text-[var(--fg)] shadow-sm sm:px-4 sm:text-sm"
            >
              {isImg ? (
                <Icon size={16} className="opacity-95" />
              ) : (
                <Icon
                  size={16}
                  color={color === "currentColor" ? undefined : color}
                  aria-hidden
                />
              )}
              <span className="whitespace-nowrap">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

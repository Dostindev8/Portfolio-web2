"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const PROFILE_LINES = [
  "{",
  '  "name": "Dostin Santana",',
  '  "role": "Fullstack Developer",',
  '  "location": "Santo Domingo, RD",',
  '  "focus": ["Clean Code", "Security", "Scale"],',
  '  "stack": ["MERN", "C#/.NET", "AI Tools"],',
  '  "mission": "Build systems that grow businesses"',
  "}",
];

const MISSION_FULL = '  "mission": "Build systems that grow businesses"';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function highlightLine(line) {
  if (!line) return <span>{"\u00A0"}</span>;
  // keys
  const keyMatch = line.match(/^(\s*)("(?:[^"\\]|\\.)*")(\s*:)(.*)$/);
  if (keyMatch) {
    const [, indent, key, colon, rest] = keyMatch;
    return (
      <>
        <span className="text-white/30">{indent}</span>
        <span className="text-sky-300">{key}</span>
        <span className="text-white/40">{colon}</span>
        {highlightValue(rest)}
      </>
    );
  }
  if (line.trim() === "{" || line.trim() === "}") {
    return <span className="text-white/50">{line}</span>;
  }
  return <span className="text-emerald-300">{line}</span>;
}

function highlightValue(rest) {
  if (!rest) return null;
  // string value
  const str = rest.match(/^(\s*)("(?:[^"\\]|\\.)*")(.*)$/);
  if (str) {
    return (
      <>
        <span className="text-white/30">{str[1]}</span>
        <span className="text-emerald-400">{str[2]}</span>
        <span className="text-white/40">{str[3]}</span>
      </>
    );
  }
  // array
  const arr = rest.match(/^(\s*)(\[)(.*)(\])(.*)$/);
  if (arr) {
    const inner = arr[3].split(",").map((part, i, a) => {
      const t = part.trim();
      const m = t.match(/^("(?:[^"\\]|\\.)*")$/);
      return (
        <span key={i}>
          {i > 0 && <span className="text-white/40">, </span>}
          {m ? (
            <span className="text-emerald-400">{m[1]}</span>
          ) : (
            <span className="text-emerald-300">{t}</span>
          )}
        </span>
      );
    });
    return (
      <>
        <span className="text-white/30">{arr[1]}</span>
        <span className="text-white/50">{arr[2]}</span>
        {inner}
        <span className="text-white/50">{arr[4]}</span>
        <span className="text-white/40">{arr[5]}</span>
      </>
    );
  }
  return <span className="text-emerald-300">{rest}</span>;
}

/**
 * LiveTerminal — typing orgánico de profile.json con cursor y loop sutil.
 */
export default function LiveTerminal({ liveLabel = "live" }) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const [lines, setLines] = useState([""]);
  const [done, setDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setLines(PROFILE_LINES);
      setDone(true);
      return;
    }

    let cancelled = false;

    (async () => {
      const out = [];
      for (let li = 0; li < PROFILE_LINES.length; li++) {
        if (cancelled) return;
        const target = PROFILE_LINES[li];
        let current = "";
        out.push("");
        setLines([...out]);
        for (let ci = 0; ci < target.length; ci++) {
          if (cancelled) return;
          current += target[ci];
          out[li] = current;
          setLines([...out]);
          const base = 22 + Math.random() * 23;
          await sleep(base);
        }
        await sleep(120 + Math.random() * 80);
      }
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [active, reduceMotion]);

  // Subtle mission rewrite loop
  useEffect(() => {
    if (!done || reduceMotion) return;
    let cancelled = false;

    (async () => {
      while (!cancelled) {
        await sleep(7000);
        if (cancelled) return;
        const idx = PROFILE_LINES.length - 2; // mission line
        // erase
        let current = MISSION_FULL;
        while (current.length > 14 && !cancelled) {
          current = current.slice(0, -1);
          setLines((prev) => {
            const next = [...prev];
            next[idx] = current;
            return next;
          });
          await sleep(18 + Math.random() * 12);
        }
        // rewrite
        for (let i = current.length; i < MISSION_FULL.length; i++) {
          if (cancelled) return;
          current = MISSION_FULL.slice(0, i + 1);
          setLines((prev) => {
            const next = [...prev];
            next[idx] = current;
            return next;
          });
          await sleep(22 + Math.random() * 20);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [done, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setShowCursor(false);
      return;
    }
    const id = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0d1117] shadow-[var(--shadow)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-xs text-white/50">profile.json</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400/90">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-emerald-400 ${done && !reduceMotion ? "animate-pulse" : ""}`}
          />
          {liveLabel}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 text-left font-mono text-[12px] leading-relaxed sm:text-[13px]">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="min-h-[1.25em]">
              {highlightLine(line)}
              {i === lines.length - 1 && showCursor && (
                <span className="ml-0.5 inline-block text-emerald-300">▋</span>
              )}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

"use client";

import { useEffect } from "react";

/**
 * useScrollLock — contador de referencias para body overflow.
 * Varios overlays (intro, menú móvil) pueden pedir lock sin pisarse.
 */
let lockCount = 0;

function applyLock() {
  if (typeof document === "undefined") return;
  document.body.style.overflow = lockCount > 0 ? "hidden" : "";
}

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    lockCount += 1;
    applyLock();
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      applyLock();
    };
  }, [locked]);
}

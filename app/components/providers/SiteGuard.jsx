"use client";

import { useEffect } from "react";

/**
 * SiteGuard — protección anti-copia del contenido.
 * Bloquea: clic derecho, copiar/cortar, arrastre de imágenes,
 * y atajos de vista de código (Ctrl+U, Ctrl+S, Ctrl+P, F12, Ctrl+Shift+I/J/C).
 * Los inputs del formulario siguen funcionando con normalidad.
 */
export default function SiteGuard() {
  useEffect(() => {
    const isFormField = (el) =>
      el instanceof HTMLElement &&
      (el.closest("input, textarea, select, [contenteditable='true']") !== null);

    const onContextMenu = (e) => {
      if (!isFormField(e.target)) e.preventDefault();
    };
    const onCopyCut = (e) => {
      if (!isFormField(e.target)) e.preventDefault();
    };
    const onDragStart = (e) => e.preventDefault();
    const onSelectStart = (e) => {
      if (!isFormField(e.target)) e.preventDefault();
    };
    const onKeyDown = (e) => {
      const k = e.key.toLowerCase();
      const blockCtrl = e.ctrlKey && !e.shiftKey && ["u", "s", "p"].includes(k);
      const blockCtrlShift = e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k);
      const blockCopy = e.ctrlKey && ["c", "x"].includes(k) && !isFormField(e.target);
      if (e.key === "F12" || blockCtrl || blockCtrlShift || blockCopy) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopyCut);
    document.addEventListener("cut", onCopyCut);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopyCut);
      document.removeEventListener("cut", onCopyCut);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}

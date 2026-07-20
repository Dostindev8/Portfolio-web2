"use client";

/**
 * AppBackground — fondo unificado para Intro + Home.
 * Una sola instancia en layout raíz; evita doble carga y parpadeo al cambiar de fase.
 */
export default function AppBackground() {
  return (
    <div className="app-background" aria-hidden>
      <div className="app-background__base" />
      <svg className="app-background__circuit" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="lcs-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.35"
            />
            <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
          </pattern>
          <pattern
            id="lcs-hex"
            width="56"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 2 L52 14 L52 34 L28 46 L4 34 L4 14 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lcs-grid)" />
        <rect width="100%" height="100%" fill="url(#lcs-hex)" opacity="0.6" />
      </svg>
      <div className="app-background__nebula app-background__nebula--tl" />
      <div className="app-background__nebula app-background__nebula--br" />
      <div className="app-background__floor" />
    </div>
  );
}

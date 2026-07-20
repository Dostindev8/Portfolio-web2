"use client";

/**
 * PortfolioShell — orquesta Intro vs Home con montaje condicional REAL.
 *
 * BUG ORIGINAL: page.js montaba CinematicIntro (overlay fixed) Y el Home completo
 * en paralelo. Navbar/Header/About/etc. vivían en el DOM desde t=0, causando flash,
 * doble fondo y layout shift detrás del intro.
 *
 * FIX: Home NO se monta hasta dissolve (opacity:0) o hasta skip/done.
 * AppBackground vive en layout.js — una sola capa visual para intro y home.
 */

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import CinematicIntro from "@/app/components/ui/CinematicIntro";
import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Work from "@/app/components/Work";
import Skills from "@/app/components/Skills";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

const INTRO_KEY = "intro_seen";

function introAlreadySeen() {
  try {
    return (
      sessionStorage.getItem(INTRO_KEY) === "1" ||
      document.documentElement.dataset.introDone === "1"
    );
  } catch {
    return true;
  }
}

export default function PortfolioShell() {
  const [introPlaying, setIntroPlaying] = useState(true);
  const [homeMounted, setHomeMounted] = useState(false);
  const [homeVisible, setHomeVisible] = useState(false);

  useLayoutEffect(() => {
    if (introAlreadySeen()) {
      setIntroPlaying(false);
      setHomeMounted(true);
      setHomeVisible(true);
      return;
    }
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (!introPlaying) {
      document.body.style.overflow = "";
    }
  }, [introPlaying]);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
      document.documentElement.dataset.introDone = "1";
    } catch {
      /* private mode */
    }
    setIntroPlaying(false);
    setHomeMounted(true);
    setHomeVisible(true);
    document.body.style.overflow = "";
  }, []);

  const handleDissolveStart = useCallback(() => {
    setHomeMounted(true);
  }, []);

  const handleCrossfade = useCallback(() => {
    setHomeVisible(true);
  }, []);

  return (
    <>
      {introPlaying && (
        <CinematicIntro
          onDissolveStart={handleDissolveStart}
          onCrossfade={handleCrossfade}
          onComplete={finishIntro}
          onSkip={finishIntro}
        />
      )}

      {homeMounted && (
        <div
          className="relative z-[1] min-h-screen transition-opacity duration-[480ms] ease-out"
          style={{ opacity: homeVisible ? 1 : 0 }}
          aria-hidden={!homeVisible}
        >
          <Navbar />
          <main>
            <Header />
            <About />
            <Services />
            <Work />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

"use client";

/**
 * PortfolioShell — Intro vs Home con montaje condicional real.
 * Scroll lock vía useScrollLock (compartido con Navbar).
 */

import { useCallback, useLayoutEffect, useState } from "react";
import CinematicIntro from "@/app/components/ui/CinematicIntro";
import Navbar from "@/app/components/Navbar";
import Header from "@/app/components/Header";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Work from "@/app/components/Work";
import Skills from "@/app/components/Skills";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import { useScrollLock } from "@/lib/useScrollLock";

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

  useScrollLock(introPlaying);

  useLayoutEffect(() => {
    if (introAlreadySeen()) {
      setIntroPlaying(false);
      setHomeMounted(true);
      setHomeVisible(true);
    }
  }, []);

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

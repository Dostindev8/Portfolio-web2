"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const themeClasses = `${theme === "dark" ? "text-white" : "text-gray-900"} transition-colors duration-500`;

  const scrollClasses = scrolled
    ? `backdrop-blur-md shadow-lg ${
        theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
      }`
    : "bg-transparent";

  const menuItems = ["Home", "About me", "Services", "My Work", "Contact me"];

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-2 left-1/2 -translate-x-1/2 z-[60] px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-md ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-yellow-400 text-gray-800"
            }`}
          >
            👋 Welcome to my portfolio!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-5 lg:px-8 xl:px-[3%] py-3 flex items-center justify-between ${themeClasses} ${scrollClasses}`}
      >
        <a href="#home" className="flex items-center gap-2 z-50">
          <Image
            src={assets.logo}
            alt="Logo"
            width={110}
            height={40}
            priority
            className="transition-transform duration-300 hover:scale-105 hover:drop-shadow-md dark:invert"
          />
        </a>

        <ul
          className={`hidden md:flex items-center gap-8 rounded-full px-8 py-2 font-Ovo ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className="relative group transition-all duration-300 hover:opacity-80"
                onClick={() => setMenuOpen(false)}
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] ${
                    theme === "dark" ? "bg-white" : "bg-black"
                  } group-hover:w-full transition-all duration-300`}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 z-50">
          <a
            href="#contactme"
            className={`hidden lg:flex items-center gap-2 px-6 py-2 border rounded-full font-Ovo transition-all duration-300 hover:shadow-lg ${
              theme === "dark"
                ? "border-white text-white hover:bg-white hover:text-gray-900"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Contact
            <Image
              src={assets.arrow_icon}
              alt="arrow"
              width={14}
              height={14}
              className={`${theme === "dark" ? "invert" : ""}`}
            />
          </a>

          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "text-yellow-400 hover:bg-gray-700"
                : "text-blue-600 hover:bg-gray-100"
            } transition-colors duration-300`}
            aria-label="Cambiar tema"
          >
            {theme === "light" ? (
              <Moon size={24} strokeWidth={2.3} />
            ) : (
              <Sun size={24} strokeWidth={2.3} />
            )}
          </motion.button>

          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden cursor-pointer p-2"
          >
            <div
              className={`w-6 h-0.5 mb-1 transition-all duration-300 ${
                theme === "dark" ? "bg-white" : "bg-black"
              } ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></div>
            <div
              className={`w-6 h-0.5 transition-all duration-300 ${
                theme === "dark" ? "bg-white" : "bg-black"
              } ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`}
            ></div>
          </div>
        </div>

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className={`fixed top-0 right-0 h-screen w-[70%] max-w-xs flex flex-col items-center justify-center gap-10 text-lg font-Ovo shadow-xl z-40 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
              onClick={() => setMenuOpen(false)}
              className="transition-transform hover:scale-110 active:scale-95 text-xl font-bold"
            >
              {item}
            </a>
          ))}

          <a
            href="#contactme"
            onClick={() => setMenuOpen(false)}
            className={`mt-4 px-8 py-3 border-2 rounded-full font-bold transition-all duration-300 ${
              theme === "dark"
                ? "border-white text-white hover:bg-white hover:text-gray-900"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Contact Now
          </a>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;

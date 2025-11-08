"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { assets, toolsData } from "../../assets/assets";

const infoList = [
  {
    icon: assets.tool_icon,
    title: "Problem Solving",
    description: "Efficient and logical approach.",
  },
  {
    icon: assets.tool_icon,
    title: "Client Focus",
    description: "Delivering value and quality.",
  },
  {
    icon: assets.tool_icon,
    title: "Teamwork",
    description: "Collaborative and communicative.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const About = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-[12%] py-20 md:py-28 scroll-mt-20 bg-transparent"
    >
      <motion.h4
        variants={fadeUp}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        className="text-center mb-2 text-lg md:text-xl font-Ovo tracking-wide"
      >
        Introduction
      </motion.h4>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{ delay: 0.15 }}
        className="text-center text-4xl md:text-5xl font-Ovo font-semibold"
      >
        About Me
      </motion.h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="w-64 sm:w-80 rounded-3xl max-w-none shadow-lg hover:scale-[1.02] transition-transform duration-500"
        >
          <Image
            src={assets.user_image}
            alt="Developer portrait"
            width={320}
            height={320}
            className="w-full rounded-3xl"
            priority
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <p className="mb-10 max-w-2xl font-Ovo leading-relaxed">
            Throughout my journey as a web developer, I have developed a strong
            ability to analyze, understand, and solve complex problems
            efficiently. I approach every challenge with a logical mindset,
            breaking it down into smaller, manageable parts to identify the root
            cause and craft effective solutions.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, title, description }, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={visible ? "visible" : "hidden"}
                transition={{ delay: 0.35 + index * 0.1 }}
                className="border border-gray-400 rounded-xl p-6 cursor-pointer 
                  hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-1 
                  duration-500 shadow-sm hover:shadow-md"
              >
                <Image
                  src={icon}
                  alt={title}
                  width={30}
                  height={30}
                  className="w-7 mt-3"
                />
                <h3 className="my-4 font-semibold text-gray-800 dark:text-gray-100">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {description}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.h4
            variants={fadeUp}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            transition={{ delay: 0.7 }}
            className="my-6 text-black-500 font-Ovo"
          >
            Tools I use in my workplace
          </motion.h4>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap items-center gap-3 sm:gap-5"
          >
            {toolsData.map((tool, index) => (
              <li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square 
                  border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 
                  dark:hover:bg-gray-800 hover:-translate-y-1 duration-500 shadow-sm hover:shadow-md"
              >
                <Image
                  src={tool}
                  alt={`Tool ${index + 1}`}
                  width={32}
                  height={32}
                  className="w-5 sm:w-7"
                />
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

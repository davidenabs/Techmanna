"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const phrases = [
  "Build Their Brand",
  "Scale Their Business",
  "Grow Their Business",
  "Automate Complexity",
];

export function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentPhrase) {
      typingSpeed = 2000;
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden flex flex-col items-center text-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl flex flex-col items-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8 text-balance flex flex-col items-center"
          >
            <span>Techmanna Helps Businesses</span>
            <div className="h-[1.3em] mt-2 flex items-center justify-center min-w-[20px]">
              <span className="highlight block whitespace-nowrap font-thin">
                {text}
                <span className="animate-pulse opacity-50 font-light ml-0.5">|</span>
              </span>
            </div>
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted max-w-2xl mb-10 text-balance leading-relaxed"
          >
            We are an elite <span className="highlight text-sm">tech studio</span> transforming complex ideas into high-performance digital products. We engineer scalable solutions that <span className="highlight text-sm">drive real growth</span> for ambitious businesses worldwide.
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="https://calendly.com/techmanna/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium bg-paper text-midnight rounded-sm hover:bg-paper/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-midnight w-full sm:w-auto"
            >
              Book a Call
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium border border-slate hover:border-paper hover:bg-paper/5 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-midnight w-full sm:w-auto"
            >
              See Our Work
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

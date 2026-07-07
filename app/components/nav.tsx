"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-midnight border-b border-slate/30 py-4 backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.png" alt="Techmanna Logo" width={140} height={40} className="w-auto h-8" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-sm font-medium hover:text-gold transition-colors focus-visible:outline-gold focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            Services
          </Link>
          <Link href="/#work" className="text-sm font-medium hover:text-gold transition-colors focus-visible:outline-gold focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            Work
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-gold transition-colors focus-visible:outline-gold focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            Contact
          </Link>
        </nav>

        <Link
          href="https://calendly.com/techmanna/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-gold text-midnight rounded-full hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
        >
          Book a Call
        </Link>
      </div>
    </header>
  );
}

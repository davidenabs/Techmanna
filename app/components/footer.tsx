import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-midnight py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <Link href="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
            <Image src="/logo.png" alt="Techmanna Logo" width={140} height={40} className="w-auto h-8 opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
          
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link href="#services" className="text-sm font-medium text-muted hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
              Services
            </Link>
            <Link href="#work" className="text-sm font-medium text-muted hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
              Work
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-muted hover:text-gold hover:bg-slate/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-muted hover:text-gold hover:bg-slate/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-muted hover:text-gold hover:bg-slate/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate/10 flex items-center justify-center text-muted hover:text-gold hover:bg-slate/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div> */}
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-muted">
          <p>&copy; {new Date().getFullYear()} Techmanna Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-paper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

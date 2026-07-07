"use client";

import { motion } from "framer-motion";

export function OperateStatement() {
  return (
    <section className="py-24 md:py-32 border-b border-slate/30 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between">

        {/* Text Content */}
        <div className="w-full mdw-1/2 mb-16 md:mb-0 relative z-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6"
          >
            Techmanna Operates <span className="highlight font-thin">24/7</span>. <br />
            That's How We Ship Fast.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted max-w-md leading-relaxed"
          >
            We work <span className="highlight text-sm">24/7</span> to help you ship your product on time. Our remote teams are across the globe helping us be available at <span className="highlight text-sm">anytime</span> and <span className="highlight text-sm">anywhere</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="https://calendly.com/techmanna/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium bg-paper text-midnight rounded-sm hover:bg-paper/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              Book a Call
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

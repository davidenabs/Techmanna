"use client";

import { motion } from "framer-motion";

export function PartnershipStatement() {
  return (
    <section className="py-24 md:py-32 border-b border-slate/30">
      <div className="container mx-auto px-6 md:px-12 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight text-balance">
            Our clients are our partners, and we&apos;re committed to their results. We build products that scale businesses and stand the test of time.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

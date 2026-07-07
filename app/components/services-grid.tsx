"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 md:py-32 relative z-10 border-b border-slate/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          >
            <span className="highlight font-thin">Quality Services</span> We Provide
          </motion.h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            return (
              <motion.div key={index} variants={item} className="flex flex-col bg-midnight border border-slate/30 p-8 hover:border-slate/70 transition-colors relative overflow-hidden group">
                <div className="absolute inset-0 bg-pattern-grid opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-paper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full justify-center min-h-[160px]">
                  <h3 className="text-xl font-bold font-display mb-3">{service.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

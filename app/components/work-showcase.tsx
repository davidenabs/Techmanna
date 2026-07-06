"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { products as baseProducts } from "@/data/products";

// We create a set of products to display (9 items)
const products = [...baseProducts, ...baseProducts, ...baseProducts];

export function WorkShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000); // Auto-move every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const getCardProps = (index: number) => {
    const total = products.length;
    // Calculate shortest distance in a circular array
    let offset = (index - currentIndex) % total;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    let x = "0%";
    let scale = 1;
    let zIndex = 0;
    let opacity = 0;
    let isCenter = false;
    let isHidden = false;

    if (offset === 0) {
      x = "0%";
      scale = 1;
      zIndex = 30;
      opacity = 1;
      isCenter = true;
    } else if (offset === 1) {
      x = "60%";
      scale = 0.85;
      zIndex = 20;
      opacity = 0.8;
    } else if (offset === -1) {
      x = "-60%";
      scale = 0.85;
      zIndex = 20;
      opacity = 0.8;
    } else if (offset === 2) {
      x = "110%";
      scale = 0.7;
      zIndex = 10;
      opacity = 0.3;
    } else if (offset === -2) {
      x = "-110%";
      scale = 0.7;
      zIndex = 10;
      opacity = 0.3;
    } else {
      x = offset > 0 ? "150%" : "-150%";
      scale = 0.5;
      zIndex = 0;
      opacity = 0;
      isHidden = true;
    }

    return { x, scale, zIndex, opacity, isCenter, isHidden };
  };

  return (
    <section id="work" className="py-24 md:py-32 border-b border-slate/30 bg-midnight overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6"
        >
          Products Built With <span className="highlight font-thin">Passion</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted max-w-2xl mx-auto"
        >
          We create products that are functional, beautiful, and easy to use.
        </motion.p>
      </div>

      <div className="w-full relative h-[300px] md:h-[450px] flex justify-center items-center perspective-1000">
        <AnimatePresence initial={false}>
          {products.map((product, index) => {
            const { x, scale, zIndex, opacity, isCenter, isHidden } = getCardProps(index);

            return (
              <motion.div
                key={`${product.name}-${index}`}
                initial={false}
                animate={{ x, scale, zIndex, opacity }}
                transition={
                  isHidden
                    ? { duration: 0 } // Snap instantly when hidden to avoid flying across screen
                    : { type: "spring", stiffness: 200, damping: 25, mass: 1 } // Buttery smooth spring
                }
                // Removed transition-all to prevent CSS from fighting Framer Motion
                className={`absolute w-[300px] md:w-[700px] aspect-video rounded-2xl overflow-hidden cursor-pointer ${isCenter
                    ? "shadow-[0_0_50px_rgba(212,160,23,0.15)] border-4 border-gold"
                    : "border border-slate/30 hover:border-slate/50"
                  }`}
                onClick={() => {
                  if (isCenter && product.url) {
                    window.open(product.url, "_blank");
                  } else {
                    setCurrentIndex(index);
                  }
                }}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover ${!isCenter && "transition-transform duration-700 hover:scale-105"}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate/10">
                    <span className="text-muted">No Image</span>
                  </div>
                )}

                {/* Darken non-center items for depth */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-midnight/70 transition-opacity duration-300"></div>
                )}

                {/* Hover overlay for the center item */}
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-paper mb-2">
                          {product.name}
                        </h3>
                        <p className="text-paper/80 text-sm md:text-base max-w-md line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <span className="px-5 py-2.5 bg-gold text-midnight text-sm font-bold rounded-full whitespace-nowrap hover:scale-105 transition-transform hidden md:inline-block shadow-lg">
                        Visit Site ↗
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

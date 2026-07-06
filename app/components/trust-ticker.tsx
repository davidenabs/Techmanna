"use client";

import { products } from "@/data/products";

export function TrustTicker() {
  const tickerItems = [...products, ...products, ...products, ...products];

  return (
    <div className="w-full py-12 flex flex-col items-center overflow-hidden border-b border-slate/30 bg-gradient-to-b from-transparent to-midnight/50">
      <p className="text-sm text-muted mb-8 px-6 text-center">We've worked with the biggest brands to build their dreams into a reality</p>
      <div className="trust-ticker-container max-w-[100vw]">
        <div className="trust-ticker-content gap-16 px-6 items-center">
          {tickerItems.map((product, idx) => (
            <div key={`${product.name}-${idx}`} className="flex items-center justify-center whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <span className="font-display font-bold text-2xl tracking-tight">{product.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

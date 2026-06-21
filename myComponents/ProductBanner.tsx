"use client";

import React from "react";

export const ProductBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden border-b border-zinc-900">
      {/* Premium Minimalist Background Accents */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {/* Fine-line geometric grid array */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Abstract High-End Red Ambient Glow Asset */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-start">
        {/* Dynamic Micro-Tagline */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <span className="h-px w-8 bg-red-600" />
          <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">
            Barrison Ecosystem
          </span>
        </div>

        {/* High-End Architectural Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-none max-w-4xl mb-6">
          The Hardware <br />
          <span className="text-zinc-400">Collection</span>
          <span className="text-red-600">.</span>
        </h1>

        {/* Minimalist Editorial Copy */}
        <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl tracking-wide uppercase">
          A definitive curation of state-of-the-art computational gear, refined
          lifestyle electronics, and luxury structural hardware. Engineered for
          modern digital purists.
        </p>

        {/* Floating Matrix Counter Detail */}
        <div className="absolute bottom-6 right-6 sm:right-8 hidden md:block">
          <span className="text-[10px] font-mono tracking-widest text-zinc-700 uppercase">
            [ EST. 2026 // ESTHETIC.01 ]
          </span>
        </div>
      </div>
    </section>
  );
};

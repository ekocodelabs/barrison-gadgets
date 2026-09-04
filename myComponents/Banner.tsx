"use client";

import React from "react";
import { FiSmartphone, FiMessageCircle, FiArrowRight } from "react-icons/fi";

export const Banner: React.FC = () => {
  // Replace this placeholder link with your actual business WhatsApp phone routing number details
  const whatsappNumber = "2348088449647"; // Format: Country Code + Phone Number (No spaces or '+' symbols)
  const preFilledMessage = encodeURIComponent(
    "Hello Barrison Gadgets, I am interested in exploring your premium hardware inventory and electronic accessories catalog. Please connect me to a product expert.",
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`;

  return (
    <section className="relative w-full h-full sm:h-screen bg-black overflow-hidden flex items-center justify-start select-none">
      {/* 1. COMPREHENSIVE BACKGROUND VIDEO MATRICIAL ARRAY */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.02] filter brightness-[0.35] contrast-[1.05]"
          poster="/images/banner1.jpg" // Fallback structural anchor graphic
        >
          {/* Place your looping abstract technical video or device close-up directly inside your /public asset folder */}
          <source src="/images/videobanner2.mp4" type="video/mp4" />
          Your modern web engine does not support inline embedded video playback
          matrices.
        </video>

        {/* Stark branding aesthetic color gradient overlay to anchor the pure white red theme */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent z-10" />
      </div>

      {/* 2. SEO-OPTIMIZED NARRATIVE CONFIGURATION BLOCK */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full z-20 text-white mt-12">
        <div className="max-w-2xl space-y-6">
          {/* SEO Micro-Anchor Tagline */}
          {/* <div className="inline-flex items-center gap-2 border border-zinc-800/80 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-none tracking-widest text-[9px] sm:text-[10px] font-black uppercase text-red-500">
            <FiSmartphone className="animate-pulse" />
            Premium Electronics // Authentic Gadget Portal
          </div> */}

          {/* Heading incorporating high-value target keywords (Gadgets, Tech Accessories, Store) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
            Engineered <br />
            Gadgets<span className="text-red-600">.</span> <br />
            Elevated Life<span className="text-red-500">_</span>
          </h1>

          {/* Structural Secondary SEO Paragraph description block mapping search indices */}
          <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed tracking-wide max-w-lg">
            Welcome to the ultimate digital tech terminal. Discover an authentic
            selection of high-end smartphones, advanced computing hardware,
            smart wearables, and premium mobile accessories. Upgrade your
            ecosystem with verified global hardware warranties at Barrison.
          </p>

          {/* 3. INTERACTIVE WHATSAPP INTEGRATION & ACTION FOOTER MATRIX */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            {/* Core Action Callout Link */}
            <a
              href="/products"
              className="bg-white hover:bg-red-600 text-black hover:text-white text-xs font-black tracking-widest uppercase rounded-none px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Catalog <FiArrowRight className="h-4 w-4" />
            </a>

            {/* Premium Custom WhatsApp Direct Portal Line */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-zinc-700 bg-black/40 hover:bg-zinc-900/90 hover:border-red-600 text-white text-xs font-black tracking-widest uppercase rounded-none px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiMessageCircle className="text-green-500 group-hover:text-red-500 h-4 w-4 transition-colors duration-300" />
              Order Via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Modern Accent Brand Footer Detail Marker Anchor */}
      {/* <div className="absolute bottom-8 left-6 sm:left-12 z-20 hidden md:flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
        <span>[ Latency Clear: 0.04ms ]</span>
        <span className="text-zinc-700">•</span>
        <span>[ Secure Electronic Checkout Nodes Engaged ]</span>
      </div> */}
    </section>
  );
};

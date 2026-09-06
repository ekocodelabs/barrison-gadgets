"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiShield, FiTruck } from "react-icons/fi";

export default function WelcomePageLayout() {
  const [isReady, setIsReady] = useState(false);
  const [loadingBarWidth, setLoadingBarWidth] = useState(0);

  // Smooth, elegant loading bar animation for a premium app feel
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingBarWidth((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white min-h-screen text-black flex flex-col justify-between selection:bg-red-600 selection:text-white select-none">
      {/* 1. TOP BRAND NAVIGATION BAR */}
      <header className="w-full flex items-center justify-between border-b border-zinc-100 px-6 sm:px-12 py-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">
            Official Store
          </span>
        </div>
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
          Lagos, Nigeria
        </span>
      </header>

      {/* 2. SPLIT LAYOUT CENTER PIECE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-7xl mx-auto px-6 sm:px-12 my-auto gap-12 items-center">
        {/* LEFT COLUMN: Large Luxury Bold Typography */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-black tracking-[0.3em] text-red-600 uppercase block">
            Barrison Gadgets
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9]">
            Premium <br />
            Tech For <br />
            Everyone<span className="text-red-600">.</span>
          </h1>
          <p className="text-zinc-500 text-sm font-light max-w-md leading-relaxed tracking-wide">
            Discover a curated collection of authentic smartphones, reliable
            laptops, smartwatches, and high-quality phone accessories built for
            your daily life.
          </p>
        </div>

        {/* RIGHT COLUMN: Elegant Boxed Entry Control Module */}
        <div className="lg:col-span-5 border border-zinc-100 bg-zinc-50/50 p-8 sm:p-12 relative flex flex-col justify-center min-h-65">
          {/* Subtle geometric red accent block inside the card */}
          <div className="absolute top-0 right-0 w-16 h-1 bg-red-600" />

          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">
            [ Store Access ]
          </h2>

          {!isReady ? (
            // User-Friendly Loading State Layout
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-wide uppercase text-zinc-600">
                Opening our catalog...
              </p>
              <div className="w-full h-0.75 bg-zinc-200 relative overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-100 ease-out"
                  style={{ width: `${loadingBarWidth}%` }}
                />
              </div>
            </div>
          ) : (
            // Clean, High-Contrast Entry Button Layout
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs font-medium text-zinc-600 uppercase tracking-wide">
                Welcome! Your online shopping terminal is ready.
              </p>
              <Link
                href="/login"
                className="group flex items-center justify-between bg-black hover:bg-red-600 text-white text-xs font-black tracking-widest uppercase px-6 py-5 rounded-none transition-all duration-300 w-full"
              >
                Enter Storefront
                <FiArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3. SIMPLIFIED THREE-COLUMN TRUST FOOTER */}
      <footer className="w-full border-t border-zinc-100 px-6 sm:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] tracking-wider text-zinc-500 uppercase font-medium">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-zinc-100 bg-zinc-50 text-red-600">
            <FiCheckCircle className="h-4 w-4" />
          </div>
          <div>
            <span className="text-black font-black block mb-0.5">
              100% Authentic
            </span>
            <span className="text-xs font-light text-zinc-400">
              Genuine items with warranty
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 border border-zinc-100 bg-zinc-50 text-red-600">
            <FiShield className="h-4 w-4" />
          </div>
          <div>
            <span className="text-black font-black block mb-0.5">
              Secure Checkout
            </span>
            <span className="text-xs font-light text-zinc-400">
              Pay on delivery or via card
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:justify-end">
          <div className="p-2 border border-zinc-100 bg-zinc-50 text-red-600">
            <FiTruck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-black font-black block mb-0.5">
              Fast Logistics
            </span>
            <span className="text-xs font-light text-zinc-400">
              Quick delivery right to your door
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

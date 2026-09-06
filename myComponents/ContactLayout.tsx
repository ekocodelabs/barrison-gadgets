"use client";

import React, { useState } from "react";
import {
  FiMail,
  FiMessageCircle,
  FiInstagram,
  FiArrowUpRight,
  FiClock,
  FiMapPin,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

export const ContactLayout: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const whatsappNumber = "2348088449647";

  const preFilledMessage = encodeURIComponent(
    "Hello Barrison Gadgets, I am interested in exploring your premium hardware inventory and electronic accessories catalog. Please connect me to a product expert.",
  );

  const channels = {
    email: "concierge@barrison.com",
    whatsapp: `https://wa.me{whatsappNumber}?text=${preFilledMessage}`,
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(channels.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="bg-black text-white min-h-screen py-24 px-6 sm:px-12 md:px-24 selection:bg-red-600 selection:text-white flex items-center justify-center font-sans antialiased"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* LEFT COLUMN: ARCHITECTURAL DARK IDENTITY LAYER */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-red-600 rounded-none animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase font-mono">
                Barrison Gadgets.
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-white leading-none">
              Contact
              <br />
              Us<span className="text-red-600">.</span>
            </h1>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm uppercase tracking-wide">
            Skip the generic forms. Directly interface with our luxury hardware
            provisioning desk across our active verification networks.
          </p>

          {/* Muted Premium Operational Status Ledger */}
          <div className="pt-8 border-t border-zinc-900 space-y-3 text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
            <div className="flex items-center gap-3">
              <FiClock className="text-red-600 h-3.5 w-3.5" />
              <span>Response Core: &lt; 120 Mins</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-red-600 h-3.5 w-3.5" />
              <span>Logistics Hub: Lagos, NG</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-CONTRAST SECURE CARDS NODE GRID */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Node 01: Secure Mail Link */}
          <a
            href={`mailto:${channels.email}`}
            className="group relative flex flex-col justify-between p-8 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/60 hover:border-zinc-800 transition-all duration-500 ease-out min-h-55 rounded-none overflow-hidden"
          >
            {/* Luminous top-border crimson tracking line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="flex items-start justify-between w-full">
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500">
                <FiMail className="text-red-500 h-5 w-5" />
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 text-zinc-600 hover:text-red-500 transition-colors z-20"
                title="Copy Email Vector"
              >
                {copied ? (
                  <FiCheck className="text-green-400 h-4 w-4" />
                ) : (
                  <FiCopy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-red-500 block tracking-[0.2em] uppercase font-mono">
                Email
              </span>
              <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-white transition-colors duration-500 block truncate">
                {channels.email}
              </span>
            </div>
          </a>

          {/* Node 02: WhatsApp Connection Link */}
          <a
            href={channels.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-8 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/60 hover:border-zinc-800 transition-all duration-500 ease-out min-h-55 rounded-none overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="flex items-start justify-between w-full">
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500">
                <FiMessageCircle className="text-zinc-400 group-hover:text-green-400 h-5 w-5 transition-colors duration-500" />
              </div>
              <FiArrowUpRight className="text-zinc-500 group-hover:text-red-500 h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-red-500 block tracking-[0.2em] uppercase font-mono">
                WhatsApp
              </span>
              <span className="text-lg font-black uppercase tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-500 block">
                WhatsApp Chat
              </span>
            </div>
          </a>

          {/* Node 03: Instagram Profile Link */}
          <a
            href={channels.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-8 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/60 hover:border-zinc-800 transition-all duration-500 ease-out min-h-55 rounded-none overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="flex items-start justify-between w-full">
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500">
                <FiInstagram className="text-red-500 h-5 w-5" />
              </div>
              <FiArrowUpRight className="text-zinc-500 group-hover:text-red-500 h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-red-500 block tracking-[0.2em] uppercase font-mono">
                Instagram
              </span>
              <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500 block">
                @barrisongadgets
              </span>
            </div>
          </a>

          {/* Node 04: TikTok Profile Link */}
          <a
            href={channels.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-8 border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/60 hover:border-zinc-800 transition-all duration-500 ease-out min-h-55 rounded-none overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="flex items-start justify-between w-full">
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500">
                <FaTiktok className="text-zinc-400 group-hover:text-zinc-100 h-4 w-4 transition-colors" />
              </div>
              <FiArrowUpRight className="text-zinc-500 group-hover:text-red-500 h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-bold text-red-500 block tracking-[0.2em] uppercase font-mono">
                TikTok
              </span>
              <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500 block">
                @barrisongadgets
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

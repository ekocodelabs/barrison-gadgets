"use client";

import React from "react";
import {
  FiMail,
  FiMessageCircle,
  FiInstagram,
  FiArrowRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";

export const ContactLayout: React.FC = () => {
  const whatsappNumber = "2348088449647"; // Format: Country Code + Phone Number (No spaces or '+' symbols)
  const preFilledMessage = encodeURIComponent(
    "Hello Barrison Gadgets, I am interested in exploring your premium hardware inventory and electronic accessories catalog. Please connect me to a product expert.",
  );
  // Configured channel matrices targeting verified profiles
  const channels = {
    email: "concierge@barrison.com",
    whatsapp: `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`,
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  };

  return (
    <section
      id="contact"
      className="bg-white text-black min-h-screen py-20 px-6 sm:px-12 selection:bg-red-600 selection:text-white flex items-center justify-center"
    >
      <div className="max-w-6xl w-full">
        {/* Stark Aesthetic Header Section */}
        <div className="border-b border-zinc-100 pb-8 mb-12">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-3">
            Communications Hub
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-900 leading-none">
            Connect Matrix<span className="text-red-600">.</span>
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed max-w-xl mt-4 uppercase tracking-wide">
            Reach our luxury hardware provisioning team instantly across any of
            our official system networks.
          </p>
        </div>

        {/* 2x2 Grid Array Layout for Legal and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Node 01: Secure Mail Link */}
          <a
            href={`mailto:${channels.email}`}
            className="group flex flex-col justify-between p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-black hover:border-black transition-all duration-300 min-h-[180px]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="p-3 bg-white border border-zinc-100 group-hover:border-zinc-800 transition-colors duration-300">
                <FiMail className="text-red-600 h-6 w-6" />
              </div>
              <FiArrowRight className="text-zinc-300 group-hover:text-red-600 h-5 w-5 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div>
              <span className="text-[9px] font-black text-red-600 block tracking-[0.2em] uppercase mb-1">
                01 // Secure Mail Transmission
              </span>
              <span className="text-sm font-mono font-medium text-zinc-900 group-hover:text-white transition-colors duration-300">
                {channels.email}
              </span>
            </div>
          </a>

          {/* Node 02: WhatsApp Connection Link */}
          <a
            href={channels.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-black hover:border-black transition-all duration-300 min-h-[180px]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="p-3 bg-white border border-zinc-100 group-hover:border-zinc-800 transition-colors duration-300">
                <FiMessageCircle className="text-green-500 h-6 w-6" />
              </div>
              <FiArrowRight className="text-zinc-300 group-hover:text-red-600 h-5 w-5 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div>
              <span className="text-[9px] font-black text-red-600 block tracking-[0.2em] uppercase mb-1">
                02 // Instant Order Gateway
              </span>
              <span className="text-base font-black uppercase tracking-tight text-zinc-900 group-hover:text-white transition-colors duration-300">
                WhatsApp Chat Support
              </span>
            </div>
          </a>

          {/* Node 03: Instagram Trace Profile Link */}
          <a
            href={channels.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-black hover:border-black transition-all duration-300 min-h-[180px]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="p-3 bg-white border border-zinc-100 group-hover:border-zinc-800 transition-colors duration-300">
                <FiInstagram className="text-red-600 h-6 w-6" />
              </div>
              <FiArrowRight className="text-zinc-300 group-hover:text-red-600 h-5 w-5 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div>
              <span className="text-[9px] font-black text-red-600 block tracking-[0.2em] uppercase mb-1">
                03 // Visual Catalog
              </span>
              <span className="text-sm font-mono font-medium text-zinc-900 group-hover:text-white transition-colors duration-300">
                @barrisongadgets
              </span>
            </div>
          </a>

          {/* Node 04: TikTok Profile Trace Link */}
          <a
            href={channels.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-black hover:border-black transition-all duration-300 min-h-[180px]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="p-3 bg-white border border-zinc-100 group-hover:border-zinc-800 transition-colors duration-300">
                <FaTiktok className="text-zinc-900 h-5 w-5" />
              </div>
              <FiArrowRight className="text-zinc-300 group-hover:text-red-600 h-5 w-5 transform group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <div>
              <span className="text-[9px] font-black text-red-600 block tracking-[0.2em] uppercase mb-1">
                04 // Media Stream Engine
              </span>
              <span className="text-sm font-mono font-medium text-zinc-900 group-hover:text-white transition-colors duration-300">
                @barrisongadgets
              </span>
            </div>
          </a>
        </div>

        {/* Global Operational Status Footer Line */}
        <div className="mt-12 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          <div className="flex items-center gap-2">
            <FiClock className="text-red-600 h-3.5 w-3.5" /> Response Window:
            Under 2 Hours
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="text-red-600 h-3.5 w-3.5" /> Master Hub: Lagos,
            Nigeria
          </div>
          <span>[ SECURE LINK CHANNELS COMPILED ]</span>
        </div>
      </div>
    </section>
  );
};

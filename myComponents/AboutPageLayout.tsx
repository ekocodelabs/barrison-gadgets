"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiActivity, FiCpu, FiCompass } from "react-icons/fi";

export default function AboutPageLayout() {
  return (
    <main className="bg-white min-h-screen pb-24 text-black selection:bg-red-600 selection:text-white">
      {/* Editorial Mini-Header Grid Row */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12 border-b border-zinc-100">
        <div className="max-w-3xl">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-3 animate-fade-in">
            Barrison Genesis // Perspective 01
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-900 leading-none mb-6">
            Architecting the <br />
            Next Tech Standard<span className="text-red-600">.</span>
          </h1>
          <p className="text-zinc-500 text-sm font-light uppercase tracking-wide leading-relaxed">
            A definitive curation of luxury hardware ecosystems engineered
            specifically for demanding modern digital workspaces.
          </p>
        </div>
      </section>

      {/* Primary Container Column Structure */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col gap-24 mt-16">
        {/* FIRST BLOCK: Dual Image & Fluid Narrative Text Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Media Block Layout Array (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {/* Image Box 01 Frame Container */}
            <div className="relative h-112.5 bg-zinc-50 border border-zinc-100 overflow-hidden group">
              <Image
                src="/images/banner1.jpg" // Located in public/about-manifesto-1.jpg
                alt="Barrison Labs Clean Minimal Engineering Workspace Array"
                fill
                priority
                sizes="(max-w-7xl) 35vw, 50vw"
                className="object-cover brightness-[0.85] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-white z-10 bg-black/40 backdrop-blur-md px-2 py-1">
                [ LABS_WORK.01 ]
              </span>
            </div>

            {/* Image Box 02 Frame Container */}
            <div className="relative h-112.5 bg-zinc-50 border border-zinc-100 overflow-hidden group sm:translate-y-8">
              <Image
                src="/images/banner2.jpg" // Located in public/about-manifesto-2.jpg
                alt="Precision Architectural Hardware Components Detail Close-up"
                fill
                sizes="(max-w-7xl) 35vw, 50vw"
                className="object-cover brightness-[0.85] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-white z-10 bg-black/40 backdrop-blur-md px-2 py-1">
                [ PRECISION_DEV.02 ]
              </span>
            </div>
          </div>

          {/* Right Text Editorial Narrative Column Block (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
              The Engineering Manifesto
            </h2>
            <p className="text-zinc-600 text-sm font-light leading-relaxed">
              At Barrison Gadgets, we look past superficial features. We treat
              hardware as a direct physical extension of human intelligence. Our
              design philosophy eliminates cheap materials and excessive
              designs, focusing purely on absolute performance metrics.
            </p>
            <p className="text-zinc-600 text-sm font-light leading-relaxed">
              Every curve, structural weld, and component in our line is
              carefully evaluated. We build for developers, designers, and
              system operators who need raw processing power and reliable
              equipment to run their daily workflows.
            </p>

            {/* Core Values Matrix Row Info Segment */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
              <div>
                <FiCpu className="text-red-600 h-5 w-5 mb-2" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-black">
                  Pure Specs
                </h4>
              </div>
              <div>
                <FiActivity className="text-red-600 h-5 w-5 mb-2" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-black">
                  Thermals
                </h4>
              </div>
              <div>
                <FiCompass className="text-red-600 h-5 w-5 mb-2" />
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-black">
                  Longevity
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND BLOCK: Pure Typography Structural Deep Editorial Text Monograph (Text Only) */}
        <div className="border-t border-zinc-100 pt-16">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.4em] text-red-500 uppercase mb-4">
              Structural Mission Statement // Ecosystem Core
            </span>

            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-8 max-w-2xl leading-snug">
              We do not distribute commodity consumer products. We deploy
              high-end operational ecosystems.
            </h3>

            {/* Structured Dual Column Text Monograph Segment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-zinc-600 text-sm font-light leading-relaxed mb-12">
              <p>
                Barrison Gadgets launched to disrupt an industry filled with
                planned obsolescence and uninspired designs. Our team brings
                together decades of expertise in industrial engineering,
                component sourcing, and interface design to build a unified
                hardware family. From smart charging systems to studio-grade
                lighting matrices, we maintain strict quality benchmarks.
              </p>
              <p>
                Our production standard uses aerospace-grade aluminum housings,
                high-density lithium polymer cell architectures, and
                color-accurate LED arrays. We run independent functional quality
                loops on every batch before it enters our fulfillment pipelines.
                This attention to detail guarantees that your Barrison equipment
                delivers reliable performance through years of continuous
                runtime.
              </p>
            </div>

            {/* Direct Marketplace Pipeline CTA Trigger Block */}
            <Link href="/products">
              <Button className="bg-black hover:bg-red-600 text-white rounded-none py-6 px-8 text-xs font-black tracking-widest uppercase transition-all duration-300">
                Source System Layouts <FiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

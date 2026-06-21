"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CAROUSEL_DATA = [
  {
    id: 1,
    image: "/images/banner3.jpg", // Must live in public/hero-1.jpg
    title: "The Next Era of Sound",
    subtitle: "Premium Audio Collection",
  },
  {
    id: 2,
    image: "/images/powerbank1.jpg",
    title: "Uncompromising Power",
    subtitle: "Smart Power Solutions",
  },
  {
    id: 3,
    image: "/images/ringlight1.jpg",
    title: "Studio Quality Lighting",
    subtitle: "Professional Creator Gear",
  },
];

export const Banner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth auto-rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] min-h-125 bg-zinc-900 overflow-hidden">
      {CAROUSEL_DATA.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Next.js Optimized Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-center brightness-[0.45]"
          />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-start max-w-7xl mx-auto px-6 sm:px-8 z-20">
            <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-3 animate-fade-in">
              {slide.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-2xl leading-none">
              {slide.title}
            </h1>
            <Link href="/products">
              <Button className="bg-white hover:bg-red-600 text-black hover:text-white rounded-none font-bold text-xs tracking-widest uppercase px-8 py-6 transition-all duration-300 shadow-xl">
                Discover Collection
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {CAROUSEL_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-red-600" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

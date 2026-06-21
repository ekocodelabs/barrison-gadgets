"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiX, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { DUMMY_PRODUCTS, Product } from "@/lib/products";

export default function FavoritePageLayout() {
  // Extract initial items marked true inside global seed dataset records
  const [favItems, setFavItems] = useState<Product[]>(
    DUMMY_PRODUCTS.filter((product) => product.favourite),
  );

  // Dynamic Array Removal Execution Pipeline
  const removeFavorite = (id: number) => {
    setFavItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="bg-white min-h-screen py-16 text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Dynamic Architectural Section Header */}
        <div className="border-b border-zinc-100 pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-2">
              Personal Watchlist
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Saved Core Hardware<span className="text-red-600">.</span>
            </h1>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 hover:text-black uppercase transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to Full Catalog
          </Link>
        </div>

        {favItems.length > 0 ? (
          /* Balanced Layout Presentation Matrix Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white border border-zinc-100 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:border-zinc-200"
              >
                {/* Absolute Top Control Action Vector Ribbon */}
                <button
                  onClick={() => removeFavorite(item.id)}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-red-50 border border-zinc-100 group/btn transition-colors"
                  aria-label="Remove item configuration out of active memory scope array"
                >
                  <FiX className="h-3.5 w-3.5 text-zinc-400 group-hover/btn:text-red-600 transition-colors" />
                </button>

                {/* Main Product Frame Layout Presentation Link Block Container */}
                <Link href={`/products/${item.id}`} className="block">
                  <div className="w-full h-56 relative mb-6 overflow-hidden bg-zinc-50/50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight text-zinc-900 uppercase mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base font-black tracking-tight text-black mb-6">
                    NGN {item.price.toLocaleString()}
                  </p>
                </Link>

                {/* Secondary Tactical Implementation Interaction Pipeline CTA */}
                <Button className="w-full bg-black hover:bg-red-600 text-white rounded-none py-5 text-xs font-black tracking-widest uppercase transition-all duration-300">
                  <FiShoppingCart className="mr-2 h-4 w-4" /> Deploy to Cart
                </Button>
              </div>
            ))}
          </div>
        ) : (
          /* High End Empty State Matrix Display Workspace */
          <div className="w-full py-32 border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase mb-3">
              Watchlist Blank
            </span>
            <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-500 mb-6">
              No Hardware Layouts Tracked Currently
            </h2>
            <Link href="/products">
              <Button className="bg-black hover:bg-red-600 text-white text-xs tracking-widest uppercase rounded-none px-8 py-5">
                Explore Tech Blueprint
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

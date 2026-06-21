"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHeart,
  FiShoppingCart,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DUMMY_PRODUCTS } from "@/lib/products";

// Declare strict parameter contract types for the dynamic router configuration
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  // Synchronously safely unwrap the async route variables
  const resolvedParams = React.use(params);
  const productId = Number(resolvedParams.id);

  // Locate the target architectural item within master catalog array
  const product = DUMMY_PRODUCTS.find((item) => item.id === productId);

  // Core Dynamic Micro-States
  const [quantity, setQuantity] = React.useState(1);
  const [isFavourite, setIsFavourite] = React.useState(
    product?.favourite || false,
  );
  const [isAddedToCart, setIsAddedToCart] = React.useState(
    product?.addtocart || false,
  );

  // High-End Graceful Exception Boundary Handling
  if (!product) {
    return (
      <main className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-6">
        <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mb-3">
          Error 404 // File Missing
        </span>
        <h1 className="text-xl font-black text-black uppercase tracking-tight mb-6">
          Device Matrix Frame Not Located
        </h1>
        <Link href="/products">
          <Button className="bg-black hover:bg-red-600 text-white text-xs tracking-widest uppercase rounded-none px-6 py-5">
            <FiArrowLeft className="mr-2 h-4 w-4" /> Return to Catalog
          </Button>
        </Link>
      </main>
    );
  }

  // Pure Numerical State Mutations
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main className="bg-white min-h-screen pt-8 pb-24">
      {/* Structural Minimalist Breadcrumb Navigation Ribbon */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-zinc-400 hover:text-black uppercase transition-colors"
        >
          <FiArrowLeft className="h-3.5 w-3.5" /> Back to Hardware Collections
        </Link>
      </nav>

      {/* Primary Presentation Dual-Grid Split Frame */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Matrix Frame: Image Presentation Block (7 Cols) */}
        <div className="lg:col-span-7 bg-zinc-50 border border-zinc-100 p-8 sm:p-12 relative flex items-center justify-center h-[50vh] md:h-[65vh] min-h-100 overflow-hidden group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-w-7xl) 60vw, 100vw"
            className="object-contain p-6 transform transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle floating branding metadata index anchor */}
          <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-zinc-400">
            [ ID-{product.id} // BARRISON.SYS ]
          </span>
        </div>

        {/* Right Matrix Frame: Commercial Core Data Block (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Meta Taxonomy Tagline */}
            <span className="text-[10px] font-black tracking-black text-red-600 uppercase mb-3 block">
              {product.category}
            </span>

            {/* High-End Architectural Title */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Micro Rating Anchor Configuration */}
            <div className="flex items-center gap-1 mb-6 border-b border-zinc-100 pb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-900 ml-2">5.0</span>
              <span className="text-xs text-zinc-400 font-light">
                (Based on 142 Verified Custom Specifications)
              </span>
            </div>

            {/* Financial Anchor Matrix */}
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                Value Configuration
              </span>
              <span className="text-3xl font-black tracking-tight text-black">
                NGN {(product.price * quantity).toLocaleString()}
              </span>
            </div>

            {/* Editorial Technical Description Segment */}
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
                Engineering Blueprint
              </span>
              <p className="text-zinc-600 text-sm font-light leading-relaxed">
                {product.description} Built strictly to handle rigorous
                production cycles, implementing optimized thermal dispersion
                metrics and an ergonomic outer composite architecture.
              </p>
            </div>

            {/* Product Variables: System Count Incrementor Form Field */}
            <div className="mb-10">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-3">
                Select Unit Count
              </span>
              <div className="inline-flex items-center border border-zinc-200 bg-white">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-3 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                  aria-label="Reduce quantity"
                >
                  <FiMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-12 text-center text-xs font-mono font-bold text-black">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-3 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Interface Operational Array */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Primary Core CTA: Cart Action Pipeline Button */}
            <Button
              onClick={() => setIsAddedToCart((prev) => !prev)}
              className={`grow rounded-none py-6 text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                isAddedToCart
                  ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                  : "bg-black hover:bg-red-600 text-white"
              }`}
            >
              <FiShoppingCart className="mr-2 h-4 w-4" />
              {isAddedToCart ? "Added to System" : "Deploy to Cart"}
            </Button>

            {/* Supplementary Feature: Favourite Watchlist Sync Button */}
            <button
              onClick={() => setIsFavourite((prev) => !prev)}
              className={`px-5 py-4 border transition-colors flex items-center justify-center rounded-none ${
                isFavourite
                  ? "border-red-600 text-red-600 bg-red-50/20"
                  : "border-zinc-200 text-zinc-400 hover:text-black hover:border-black"
              }`}
              aria-label="Add to system core watchlist"
            >
              <FiHeart
                className={`h-5 w-5 ${isFavourite ? "fill-red-600" : ""}`}
              />
            </button>
          </div>

          {/* Luxury Fulfillment Trust Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-100 pt-6">
            <div className="flex items-center gap-3">
              <FiTruck className="text-red-600 h-4 w-4 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black uppercase tracking-wider">
                  Premium Logistics
                </span>
                <span className="text-[9px] text-zinc-400 uppercase">
                  Complimentary 48hr delivery
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="text-red-600 h-4 w-4 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black uppercase tracking-wider">
                  Secure Protocol
                </span>
                <span className="text-[9px] text-zinc-400 uppercase">
                  Encrypted terminal checkout
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiRefreshCw className="text-red-600 h-4 w-4 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black uppercase tracking-wider">
                  Hardware Returns
                </span>
                <span className="text-[9px] text-zinc-400 uppercase">
                  30-day structural assurance
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

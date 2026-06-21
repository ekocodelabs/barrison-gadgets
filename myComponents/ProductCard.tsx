"use client";

import React from "react";
import Image from "next/image";
import useRouter from "next/navigation"; // Next.js App Router navigation hooks
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";

interface ProductCardProps {
  id: number;
  product: Product;
  onToggleFavourite?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  product,
  onToggleFavourite,
  onAddToCart,
}) => {
  const router = useRouter.useRouter();

  // Route directly to standard dynamic product item specification path
  const handleNavigation = () => {
    router.push(`/products/${id}`);
  };
  return (
    <div
      onClick={handleNavigation}
      className="group bg-white border border-zinc-100 flex flex-col justify-between p-6 transition-all duration-500 hover:shadow-2xl hover:border-zinc-200 cursor-pointer relative"
    >
      {/* Top Meta Header: Favourite Action Icon Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Shield child triggers from global navigation
            if (onToggleFavourite) onToggleFavourite(product.id);
          }}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-zinc-50 border border-zinc-100 transition-colors"
          aria-label="Toggle Favourite"
        >
          <FiHeart
            className={`h-4 w-4 transition-colors ${
              product.favourite
                ? "fill-red-600 text-red-600"
                : "text-zinc-400 group-hover:text-black"
            }`}
          />
        </button>
      </div>

      {/* High-Contrast Core Display Showcase Image */}
      <div className="w-full h-64 relative mb-6 overflow-hidden bg-zinc-50/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-w-7xl) 33vw, 50vw"
          className="object-contain p-6 transform transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Informational Descriptor Matrix block */}
      <div className="flex flex-col grow justify-between">
        <div>
          {/* Static High-End Category Metadata Label */}
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1 block">
            {product.category}
          </span>

          <h3 className="text-sm font-bold tracking-tight text-zinc-900 mb-2 max-w-[85%] group-hover:text-red-600 transition-colors line-clamp-1">
            {product.title}
          </h3>

          {/* Hardcoded 5-Star Array for Premium Visual Anchor */}
          <div className="flex items-center gap-0.5 mb-4 text-zinc-200">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="h-3 w-3 text-amber-400" />
            ))}
            <span className="text-[10px] font-mono text-zinc-400 ml-2">
              (5.0)
            </span>
          </div>
        </div>

        {/* Action Controls & Financial Anchor Block */}
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase leading-none mb-0.5">
              Price
            </span>
            <span className="text-base font-black tracking-tight text-black">
              NGN {product.price.toLocaleString()}
            </span>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation(); // Avoid accidental detail layout redirections
              if (onAddToCart) onAddToCart(product.id);
            }}
            className={`rounded-none px-4 py-5 font-bold text-xs tracking-widest uppercase transition-all duration-300 ${
              product.addtocart
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                : "bg-black hover:bg-red-600 text-white"
            }`}
          >
            <FiShoppingCart className="mr-2 h-4 w-4" />
            {product.addtocart ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export interface AdminProduct {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  category:
    | "appliances"
    | "electronics"
    | "fashion"
    | "phones & tablets"
    | "computing";
}

interface AdminProductCardProps {
  product: AdminProduct;
  onDelete: (id: number | string) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onDelete,
}) => {
  return (
    <div className="group bg-white border border-zinc-100 flex flex-col justify-between p-6 transition-all duration-500 hover:shadow-2xl hover:border-zinc-200 relative">
      {/* Absolute Top Control Action Vector: Delete Trigger Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => onDelete(product.id)}
          className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-red-50 border border-zinc-100 group/btn transition-all duration-300"
          aria-label="Purge asset record out of active store memory scope"
        >
          <FiTrash2 className="h-4 w-4 text-zinc-400 group-hover/btn:text-red-600 transition-colors" />
        </button>
      </div>

      {/* Product Image Frame Grid */}
      <div className="w-full h-48 relative mb-4 overflow-hidden bg-zinc-50/50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Structural Descriptive Micro Text Mappings */}
      <div className="flex flex-col grow justify-between">
        <div>
          <span className="text-[9px] font-black tracking-widest text-red-600 uppercase mb-1 block">
            {product.category}
          </span>
          <h3 className="text-sm font-bold tracking-tight text-zinc-900 uppercase line-clamp-1 mb-1">
            {product.title}
          </h3>
          <p className="text-zinc-400 text-[11px] font-light leading-snug line-clamp-2 uppercase tracking-wide mb-4">
            {product.description}
          </p>
        </div>

        {/* Lower Asset Financial Value Display Matrix */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold tracking-wider text-zinc-400 uppercase leading-none mb-0.5">
              Asset ID
            </span>
            <span className="text-xs font-mono font-bold text-zinc-600">
              #{product.id}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-bold tracking-wider text-zinc-400 uppercase block leading-none mb-0.5">
              Value
            </span>
            <span className="text-sm font-black tracking-tight text-black">
              ₦{product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

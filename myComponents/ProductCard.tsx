"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/models/Products";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  _id: string;
  product: IProduct;
  onToggleFavourite?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  product,
  onToggleFavourite,
  onAddToCart,
}) => {
  const router = useRouter();

  // Route directly to standard dynamic product item specification path
  const handleNavigation = () => {
    router.push(`/products/${_id}`);
  };

  //pull the array of cart items from the zustand store
  const { cartItems, updateQuantity, addToCart, toggleFavorite } =
    useCartStore();

  //check if card product id is in the cart items array
  const isInCart = cartItems.some((item) => item.productId === _id);

  //check if card product id is in the favorite items array
  const isFavorite = useCartStore((state) => state.favoriteItems.includes(_id));

  const currentQuantity =
    cartItems.find((item) => item.productId === _id)?.quantity || 0;

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
            toggleFavorite(_id);
          }}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-zinc-50 border border-zinc-100 transition-colors"
          aria-label="Toggle Favourite"
        >
          <FiHeart
            className={`h-4 w-4 transition-colors ${
              isFavorite
                ? "fill-red-600 text-red-600"
                : "text-zinc-400 group-hover:text-black"
            }`}
          />
        </button>
      </div>

      {/* High-Contrast Core Display Showcase Image */}
      <div className="mb-6 h-64 w-full overflow-hidden bg-zinc-50/50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
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

          <div className="flex items-center gap-2">
            {isInCart ? (
              /* If the product is already in the cart, show quantity controls */
              <div className="inline-flex items-center border border-zinc-200 bg-white">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product._id.toString(), currentQuantity - 1);
                  }}
                  className="px-2 py-1 text-sm font-bold text-zinc-600 hover:bg-zinc-200"
                >
                  -
                </button>
                <span className="px-2 py-1 text-sm font-bold text-zinc-600">
                  {currentQuantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(product._id.toString(), currentQuantity + 1);
                  }}
                  className="px-2 py-1 text-sm font-bold text-zinc-600 hover:bg-zinc-200"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product._id.toString());
                }}
                className="px-4 py-2 bg-red-600 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-red-700"
              >
                <FiShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

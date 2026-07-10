"use client";

import { useEffect, useState } from "react";
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
import { IProduct } from "@/models/Products";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";

interface PageProps {
  params: { id: string };
}

export default function ProductDetailsPage({ params }: PageProps) {
  const productId = params.id;
  const { data: session } = useSession();
  // Single product state block container
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const fetchCart = useCartStore((state) => state.fetchCartItems);
  const fetchUserData = useCartStore((state) => state.fetchUserData);
  const favoriteItems = useCartStore((state) => state.favoriteItems);

  useEffect(() => {
    let isMounted = true;

    if (session?.user) {
      fetchCart();
      fetchUserData();
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorStatus(null);

      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Product not found");
        }

        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        if (isMounted) {
          setErrorStatus(
            error instanceof Error ? error.message : "Failed to load product",
          );
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [productId, fetchCart, fetchUserData]);

  //pull the array of cart items from the zustand store
  const { cartItems, updateQuantity, addToCart, toggleFavorite } =
    useCartStore();

  //check if card product id is in the cart items array
  const isInCart = cartItems.some((item) => item.productId === productId);

  //check if card product id is in the favorite items array
  const isFavorite = useCartStore((state) =>
    state.favoriteItems.includes(productId),
  );

  const currentQuantity =
    cartItems.find((item) => item.productId === productId)?.quantity || 0;

  if (isLoading) {
    return (
      <main className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-6">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Loading product...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-6">
        <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mb-3">
          Error 404 // File Missing
        </span>
        <h1 className="text-xl font-black text-black uppercase tracking-tight mb-6">
          Device Matrix Frame Not Located
        </h1>
        {errorStatus ? (
          <p className="mb-4 text-sm text-zinc-500">{errorStatus}</p>
        ) : null}
        <Link href="/products">
          <Button className="bg-black hover:bg-red-600 text-white text-xs tracking-widest uppercase rounded-none px-6 py-5">
            <FiArrowLeft className="mr-2 h-4 w-4" /> Return to Catalog
          </Button>
        </Link>
      </main>
    );
  }

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
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 55vw"
            className="object-contain p-6 transform transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle floating branding metadata index anchor */}
          <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-zinc-400">
            [ ID- {product.id}// BARRISON.SYS ]
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
              {/* Top Meta Header: Favourite Action Icon Button */}
              <div className="ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Shield child triggers from global navigation
                    toggleFavorite(product._id.toString());
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
            </div>

            {/* Financial Anchor Matrix */}
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                Value Configuration
              </span>
              <span className="text-3xl font-black tracking-tight text-black">
                NGN {product.price}
              </span>
            </div>

            {/* Editorial Technical Description Segment */}
            <div className="mb-8">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
                Engineering Blueprint
              </span>
              <p className="text-zinc-600 text-sm font-light leading-relaxed">
                dec Built strictly to handle rigorous production cycles,
                implementing optimized thermal dispersion metrics and an
                ergonomic outer composite architecture.
              </p>
            </div>

            {/* Product Variables: System Count Incrementor Form Field */}
            <div className="mb-10">
              <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-3">
                Select Unit Count
              </span>

              {isInCart ? (
                <div className="inline-flex items-center border border-zinc-200 bg-white">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      updateQuantity(
                        product._id.toString(),
                        currentQuantity - 1,
                      );
                    }}
                    className="px-4 py-3 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                    aria-label="Reduce quantity"
                  >
                    <FiMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold text-black">
                    {currentQuantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(
                        product._id.toString(),
                        currentQuantity + 1,
                      );
                    }}
                    className="px-4 py-3 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="h-3.5 w-3.5" />
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

          {/* Action Interface Operational Array */}

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

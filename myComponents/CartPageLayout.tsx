"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiCreditCard,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { DUMMY_PRODUCTS, Product } from "@/lib/products";

export default function CartPageLayout() {
  // Extract initial active item states directly from local simulation array
  const [cartItems, setCartItems] = useState<Product[]>(
    DUMMY_PRODUCTS.filter((product) => product.addtocart),
  );

  // Maintain separate local records tracking item volume quantities per id string
  const [quantities, setQuantities] = useState<Record<number, number>>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}),
  );

  // Pure Numerical State Mutations
  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const nextValue = current + delta;
      return { ...prev, [id]: nextValue > 0 ? nextValue : 1 };
    });
  };

  // Structural Removal Vector Array pipeline handlers
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Financial Pricing Engine Computations
  const subtotal = cartItems.reduce((sum, item) => {
    const qty = quantities[item.id] || 1;
    return sum + item.price * qty;
  }, 0);

  const shippingFees = subtotal > 1500 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + shippingFees;

  return (
    <main className="bg-white min-h-screen py-16 text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Dynamic Architectural Section Header */}
        <div className="border-b border-zinc-100 pb-6 mb-12">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-2">
            System Operations
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Your Terminal Cart<span className="text-red-600">.</span>
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column Stack: Cart Row Line Items Array (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => {
                const itemQty = quantities[item.id] || 1;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-6 bg-zinc-50 border border-zinc-100 gap-6 transition-all duration-300 hover:border-zinc-200"
                  >
                    {/* Item Core Identifier Asset */}
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="relative h-24 w-24 bg-white border border-zinc-100 p-2 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-sm font-bold tracking-tight text-zinc-900 uppercase max-w-xs">
                          {item.title}
                        </h3>
                        <p className="text-xs font-black text-red-600 mt-1">
                          NGN {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Operational Variable Modifier Matrix Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0">
                      <div className="inline-flex items-center border border-zinc-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-zinc-500 hover:text-black transition-colors"
                          aria-label="Decrease tracking target quantity"
                        >
                          <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold">
                          {itemQty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-zinc-500 hover:text-black transition-colors"
                          aria-label="Increase tracking target quantity"
                        >
                          <FiPlus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Cumulative Row Arithmetic Result */}
                      <span className="text-sm font-black tracking-tight min-w-17.5 text-right">
                        NGN {(item.price * itemQty).toLocaleString()}
                      </span>

                      {/* Line Item Deletion Anchor Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                        aria-label="Purge line item from cart array system structure"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 hover:text-black uppercase transition-colors pt-4"
              >
                <FiArrowLeft className="h-4 w-4" /> Continue Catalog Sourcing
              </Link>
            </div>

            {/* Right Column Stack: Value Ledger Financial Ledger Panel (4 Cols) */}
            <div className="lg:col-span-4 bg-zinc-950 text-white p-8 border border-zinc-900 sticky top-24">
              <h2 className="text-xs font-black tracking-[0.25em] uppercase text-zinc-400 mb-6 border-b border-zinc-800 pb-4">
                Order Configuration Summary
              </h2>

              <div className="space-y-4 text-xs tracking-wider uppercase font-medium mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal Value</span>
                  <span className="font-mono text-white">
                    NGN {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Premium Logistics Delivery</span>
                  <span className="font-mono text-white">
                    {shippingFees === 0
                      ? "Complimentary"
                      : `NGN ${shippingFees}.00`}
                  </span>
                </div>
                <div className="border-t border-zinc-800 my-4 pt-4 flex justify-between text-sm font-black tracking-tight">
                  <span className="text-red-500">Grand Valuation</span>
                  <span className="font-mono text-white text-base">
                    NGN {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-red-600 hover:bg-white text-white hover:text-black rounded-none py-6 text-xs font-black tracking-widest uppercase transition-all duration-300">
                  <FiCreditCard className="mr-2 h-4 w-4" /> Proceed To Checkout
                  Terminal
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* High End Empty State Matrix Display Workspace */
          <div className="w-full py-32 border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mb-3">
              System Empty
            </span>
            <h2 className="text-lg font-bold uppercase tracking-tight mb-6">
              Your Cart Holds No Dynamic Assets
            </h2>
            <Link href="/products">
              <Button className="bg-black hover:bg-red-600 text-white text-xs tracking-widest uppercase rounded-none px-8 py-5">
                Source Hardware Catalog
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

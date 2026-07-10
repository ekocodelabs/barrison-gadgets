"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiLogOut,
  FiShield,
  FiSliders,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { OrderCard, OrderData } from "@/myComponents/OrderCard";
import { useSession, signOut } from "next-auth/react";

type LeanUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  favoriteProducts: number[]; // Array of product IDs
  cartProducts: number[]; // Array of product IDs
  createdAt: Date;
};

// High-End Seed Arrays for Historical Orders Ledger Verification
const DUMMY_ORDERS: OrderData[] = [
  {
    customerEmail: "alexander@barrison.com",
    shippingAddress: {
      street: "12 Architectural Ave",
      city: "Ikoyi",
      state: "Lagos",
      postalCode: "101233",
    },
    orderItems: [
      {
        productId: 101,
        title: "Barrison Zenith Book Pro",
        quantity: 1,
        price: 2499000,
      },
      {
        productId: 301,
        title: "StudioPro Wireless ANC",
        quantity: 2,
        price: 349000,
      },
    ],
    paystackPaymentDetails: {
      totalPrice: 3197000,
      paystackReference: "BSTK-948201948-X",
      isPaid: true,
      paidAt: new Date("2026-06-15"),
    },
    status: "Delivered",
    createdAt: new Date("2026-06-15"),
  },
  {
    customerEmail: "alexander@barrison.com",
    shippingAddress: {
      street: "12 Architectural Ave",
      city: "Ikoyi",
      state: "Lagos",
      postalCode: "101233",
    },
    orderItems: [
      {
        productId: 201,
        title: "Stratus Ultra 5G Titanium",
        quantity: 1,
        price: 1199000,
      },
    ],
    paystackPaymentDetails: {
      totalPrice: 1199000,
      paystackReference: "BSTK-003928114-A",
      isPaid: true,
      paidAt: new Date("2026-06-25"),
    },
    status: "Processing",
    createdAt: new Date("2026-06-25"),
  },
];

export default function ProfilePageLayout() {
  const { data: session } = useSession();
  const [user, setUser] = useState<LeanUser | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [session]);

  // Account Information Profile Target variables placeholders
  const userProfile = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    role: user?.role,
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <main className="bg-white min-h-screen text-black pb-24">
      {/* Top Banner Accent Border Strip Layout Segment */}
      <div className="w-full h-2 bg-red-600" />

      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT MASTER FRAME COLUMN: Identity Dashboard Card (4 Cols) */}
          <div className="lg:col-span-4 bg-zinc-50 border border-zinc-100 p-8 relative flex flex-col justify-between">
            <div>
              {/* Graphic Structural Avatar Placeholder Core Icon Frame */}
              <div className="h-16 w-16 bg-black flex items-center justify-center relative mb-6">
                <FiUser className="text-white h-7 w-7" />
                {userProfile.role === "admin" && (
                  <span className="absolute -bottom-1 -right-1 bg-red-600 text-[8px] font-black tracking-widest text-white uppercase px-1.5 py-0.5 border border-black">
                    SYS
                  </span>
                )}
              </div>

              {/* Personal Descriptive Block Typography Matrices */}
              <div className="space-y-1 mb-8">
                <span className="text-[9px] font-black tracking-[0.3em] text-red-600 uppercase block">
                  Operator Verified Profile
                </span>
                <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <p className="text-zinc-400 text-xs font-mono font-medium tracking-wide">
                  {userProfile.email}
                </p>
              </div>

              {/* Secondary Navigation System Actions Grid */}
              <div className="space-y-3 pt-6 border-t border-zinc-200/60">
                {/* Advanced Multi-directional Link Elements */}
                <Link href="/cart" className="block w-full">
                  <Button className="w-full bg-black hover:bg-red-600 text-white font-black text-xs tracking-widest uppercase py-5 rounded-none transition-all duration-300 justify-between px-5">
                    <span className="flex items-center gap-2">
                      <FiShoppingCart className="h-4 w-4" /> Open System Cart
                    </span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 font-mono">
                      GO
                    </span>
                  </Button>
                </Link>

                <Link href="/favorite" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full border-zinc-200 hover:border-black text-black font-black text-xs tracking-widest uppercase py-5 rounded-none transition-colors justify-between px-5"
                  >
                    <span className="flex items-center gap-2">
                      <FiHeart className="h-4 w-4 text-red-600" /> Watchlist
                      Favorites
                    </span>
                    <span className="text-[10px] bg-zinc-100 text-zinc-400 px-2 py-0.5 font-mono">
                      GO
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Account Disconnect Control Element Pipeline Trigger Base */}
            <div className="mt-12 pt-6 border-t border-zinc-200/60">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full text-zinc-500 hover:text-red-600 hover:bg-red-50/20 text-xs font-black tracking-widest uppercase py-5 rounded-none transition-all duration-300 justify-start px-3"
              >
                <FiLogOut className="mr-3 h-4 w-4 text-red-600" /> Disconnect
                User Node
              </Button>
            </div>
          </div>

          {/* RIGHT MASTER FRAME COLUMN: Ledger Feeds & Data Tables (8 Cols) */}
          <div className="lg:col-span-8">
            {/* Header Matrix Module Line Title block */}
            <div className="border-b border-zinc-100 pb-4 mb-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black tracking-[0.25em] text-zinc-400 uppercase block mb-1">
                  Database Query Feed
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight text-black">
                  Transaction Order History
                  <span className="text-red-600">.</span>
                </h2>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                [{DUMMY_ORDERS.length} Entries Logged]
              </span>
            </div>

            {/* Dynamic Rendering Mapping Loop Matrix Block */}
            {DUMMY_ORDERS.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_ORDERS.map((order, idx) => (
                  <OrderCard key={idx} order={order} />
                ))}
              </div>
            ) : (
              /* High-End Empty History Fallback Framework Graphic Layout */
              <div className="w-full py-24 border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center p-6">
                <FiSliders className="text-zinc-300 h-8 w-8 mb-3" />
                <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mb-1">
                  Null Transaction Loop
                </span>
                <p className="text-zinc-400 text-xs font-light uppercase tracking-wide max-w-xs">
                  No e-commerce deployment runs are currently assigned to this
                  identity profile trace.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

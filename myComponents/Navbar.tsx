"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // Assuming standard shadcn path

interface NavbarProps {
  isLoggedIn: boolean;
  cartCount?: number;
  favIconCount?: number;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  cartCount = 0,
  favIconCount = 0,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-widest text-black uppercase">
            Barrison<span className="text-red-600">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-zinc-600 transition-colors">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About Us
          </Link>
          <Link
            href="/products"
            className="hover:text-black transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-red-600 after:transition-all"
          >
            Products
          </Link>
        </nav>

        {/* Conditional Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Cart Icon Link */}
              <Link
                href="/cart"
                className="relative p-2 text-zinc-800 hover:text-red-600 transition-colors"
              >
                <FiShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/favorite"
                className="relative p-2 text-zinc-800 hover:text-red-600 transition-colors"
              >
                <FaHeart className="h-6 w-6" />
                {favIconCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {favIconCount}
                  </span>
                )}
              </Link>

              {/* Logout Button */}
              <Button
                variant="ghost"
                onClick={onLogout}
                className="flex items-center gap-2 text-zinc-600 hover:text-black hover:bg-zinc-50"
              >
                <FiLogOut className="h-4 w-4 text-red-600" />
                <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
                  Logout
                </span>
              </Button>
            </>
          ) : (
            /* Login / Signup CTA */
            <Link href="/auth">
              <Button className="bg-black hover:bg-red-600 text-white font-medium text-xs tracking-widest uppercase px-6 py-5 rounded-none transition-all duration-300">
                <FiUser className="mr-2 h-4 w-4" /> Account
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

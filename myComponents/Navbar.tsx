"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { DUMMY_PRODUCTS } from "@/lib/products";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";

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

export function Navbar() {
  const { data: session } = useSession();
  const [user, setUser] = useState<LeanUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showMobileMenuButton, setShowMobileMenuButton] = useState(false);

  // const cartCount = useMemo(
  //   () => DUMMY_PRODUCTS.filter((product) => product.addtocart).length,
  //   [],
  // );

  // const favIconCount = useMemo(
  //   () => DUMMY_PRODUCTS.filter((product) => product.favourite).length,
  //   [],
  // );

  const onLogout = () => {
    setIsMenuOpen(false);
    signOut({ callbackUrl: "/login" });
  };

  const fetchCart = useCartStore((state) => state.fetchCartItems);
  const fetchUserData = useCartStore((state) => state.fetchUserData);
  const cartItems = useCartStore((state) => state.cartItems);
  const favoriteItems = useCartStore((state) => state.favoriteItems);
  useEffect(() => {
    const updateMenuButton = () => {
      setShowMobileMenuButton(window.innerWidth < 768);
    };

    if (session?.user?.email) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }

    if (session?.user) {
      fetchCart();
      fetchUserData();
    }

    updateMenuButton();
    window.addEventListener("resize", updateMenuButton);
    return () => window.removeEventListener("resize", updateMenuButton);

    //fetch cart
  }, [session, fetchCart, fetchUserData]);

  const cartCount = cartItems.length;
  const faviconcount = favoriteItems.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-widest text-black uppercase">
            Barrison<span className="text-red-600">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-zinc-600 transition-colors">
          <Link
            href="/"
            className="rounded-md px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            About Us
          </Link>
          <Link
            href="/products"
            className="group relative rounded-md px-3 py-2 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            Products
            <span className="absolute left-3 bottom-2 h-0.5 w-0 bg-red-600 transition-all group-hover:w-5" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/cart"
                  className="relative p-2 text-zinc-800 transition-colors hover:text-red-600"
                >
                  <FiShoppingCart className="h-6 w-6" />

                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartCount.toString()}
                  </span>
                </Link>

                <Link
                  href="/favorite"
                  className="relative p-2 text-zinc-800 transition-colors hover:text-red-600"
                >
                  <FaHeart className="h-6 w-6" />

                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {faviconcount}
                  </span>
                </Link>

                <Link
                  href="/profile"
                  className="relative p-2 text-zinc-800 transition-colors hover:text-red-600"
                >
                  <IoPersonCircle className="h-6 w-6" />
                </Link>

                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <FiLogOut className="h-4 w-4 text-red-600" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Logout
                  </span>
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="rounded-md bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-600">
                  <FiUser className="mr-2 h-4 w-4" /> Account
                </Button>
              </Link>
            )}
          </div>
          {/* menu button */}
          {showMobileMenuButton && (
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-zinc-100 bg-white shadow-sm md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4">
            <Link
              href="/"
              className="block rounded-md px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="block rounded-md px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/favorite"
              className="block rounded-md px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorite
            </Link>
            <Link
              href="/cart"
              className="block rounded-md px-4 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>

            {session ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="mt-3 w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-800 hover:bg-zinc-100"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="mt-3 w-full rounded-md bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:bg-red-600">
                  Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

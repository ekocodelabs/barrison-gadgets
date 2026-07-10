"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiChevronDown, FiSliders } from "react-icons/fi";
import { ProductBanner } from "./ProductBanner"; // Path tracking previous component
import { ProductCard } from "./ProductCard";
import { IProduct } from "@/models/Products";

// Complete valid taxonomy arrays mapped explicitly from instructions
const CATEGORIES = [
  "all",
  "appliances",
  "electronics",
  "fashion",
  "phones & tablets",
  "computing",
] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function ProductsPage() {
  //create a useffect the fetch the products from the database and set the state
  const [dbProducts, setDbProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Core Data Filtering Architecture Matrix
  const filteredProducts = useMemo(() => {
    return dbProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dbProducts, searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const products = await response.json();
        setDbProducts(products);
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Demo Dynamic Component Action Handles
  const handleToggleFavourite = (id: number) => {};

  const handleAddToCart = (id: number) => {};

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* Structural Minimalist Top Banner Section Header */}
      <ProductBanner />

      {/* Control Strip & Catalog Query Interface Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-10 border-b border-zinc-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Dynamic Premium Search Query Input Field */}
          <div className="relative w-full md:max-w-md border-b border-zinc-200 focus-within:border-black transition-colors py-2.5">
            <FiSearch className="absolute left-1 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Luxury Tech Arrays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-8 pr-4 text-xs tracking-wider uppercase font-medium text-black placeholder-zinc-400 focus:outline-none"
            />
          </div>

          {/* Premium Dropdown Category Select Tool */}
          <div className="relative w-full md:w-64">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full flex items-center justify-between border border-zinc-200 px-4 py-3 bg-white text-xs tracking-widest font-bold text-black uppercase rounded-none hover:border-black transition-colors"
            >
              <span className="flex items-center gap-2">
                <FiSliders className="h-3.5 w-3.5 text-zinc-400" />
                Category: {selectedCategory}
              </span>
              <FiChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Absolute Dropdown Overlay Matrix */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <ul className="absolute top-[110%] left-0 w-full bg-white border border-zinc-200 shadow-2xl z-40 rounded-none overflow-hidden">
                  {CATEGORIES.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-xs tracking-widest font-semibold uppercase transition-colors ${
                          selectedCategory === category
                            ? "bg-zinc-950 text-white"
                            : "text-zinc-600 bg-white hover:bg-zinc-50 hover:text-black"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Structural Grid Output Block */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id.toString()}
                _id={product._id.toString()}
                product={product}
                onToggleFavourite={handleToggleFavourite}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          /* High End Empty State Informational Workspace Display */
          <div className="w-full py-32 border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mb-2">
              No Records Found
            </span>
            <p className="text-zinc-400 text-xs font-light max-w-xs uppercase tracking-wide">
              No architectural assets fit your active filtering queries. Try
              resetting variables.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

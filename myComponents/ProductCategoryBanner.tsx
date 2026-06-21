import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCard {
  id: string | number;
  title: string;
  image: string;
}

interface CategoryBannerProps {
  tagline: string;
  headline: string;
  description: string;
  heroImage: string;
  products: [ProductCard, ProductCard]; // Strictly enforces 2 cards layout
  reverseLayout?: boolean;
}

export const ProductCategoryBanner: React.FC<CategoryBannerProps> = ({
  tagline,
  headline,
  description,
  heroImage,
  products,
  reverseLayout = false,
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${reverseLayout ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Narrative Hero Card Block (5 cols) */}
          <div
            className={`relative h-137.5 bg-zinc-950 flex flex-col justify-end p-8 sm:p-12 overflow-hidden lg:col-span-5 ${reverseLayout ? "lg:order-last" : ""}`}
          >
            <Image
              src={heroImage}
              alt={headline}
              fill
              className="object-cover brightness-50 hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 text-white">
              <span className="text-red-500 font-bold tracking-widest text-[10px] uppercase mb-2 block">
                {tagline}
              </span>
              <h2 className="text-3xl font-black tracking-tight mb-4 uppercase">
                {headline}
              </h2>
              <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                {description}
              </p>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black rounded-none text-xs tracking-widest uppercase transition-all"
                >
                  Explore Range
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Showcases Block (7 cols showcasing 2 cards) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 h-full justify-between">
            {products.map((item) => (
              <div
                key={item.id}
                className="flex-1 bg-zinc-50 border border-zinc-100 group relative flex flex-col justify-between p-6 hover:shadow-2xl hover:border-zinc-200 transition-all duration-500"
              >
                <div className="w-full h-64 relative mb-6 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900 mb-4 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <Link href={`/products`}>
                    <Button className="w-full bg-black hover:bg-red-600 text-white text-xs tracking-widest uppercase rounded-none py-5 transition-all">
                      Explore Product
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

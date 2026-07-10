"use client";

import React, { useMemo, useState } from "react";
import { FiCpu, FiFileText, FiGrid, FiImage, FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AdminProductCard,
  AdminProduct,
} from "@/myComponents/AdminProductCard";

const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: 101,
    title: "Barrison Zenith Book Pro",
    description:
      "Ultra-slim aerospace-grade aluminum chassis powered by a 16-core neural processor.",
    price: 2499000,
    image: "/products/computing-zenith.png",
    category: "computing",
  },
  {
    id: 201,
    title: "Stratus Ultra 5G",
    description:
      "Sleek titanium framing housing a 200MP cinematic sensor array system blueprint.",
    price: 1199000,
    image: "/products/phone-stratus.png",
    category: "phones & tablets",
  },
  {
    id: 301,
    title: "StudioPro Wireless ANC",
    description:
      "Lossless acoustic dimension headphones featuring dynamic active noise cancellation algorithms.",
    price: 349000,
    image: "/products/audio-studiopro.png",
    category: "electronics",
  },
];

export default function AddProductPageLayout() {
  const [products, setProducts] = useState<AdminProduct[]>(
    INITIAL_ADMIN_PRODUCTS,
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<AdminProduct["category"] | "">("");
  // State for upload status and errors
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price || !image || !category) return;

    const newProduct: AdminProduct = {
      id: Date.now(),
      title,
      description,
      price: Number(price),
      image,
      category: category as AdminProduct["category"],
    };

    setProducts((prev) => [newProduct, ...prev]);
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategory("");
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle file selection and upload to Cloudinary
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    // Convert file to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      if (typeof base64Data !== "string") {
        setError("Unable to read selected file.");
        setUploading(false);
        return;
      }

      try {
        // Send Base64 data to API for Cloudinary upload
        const response = await fetch("/api/cloudinary/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Data }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Upload failed");
        }

        // Set the returned URL and log it
        setImageUrl(data.url);
        console.log("Cloudinary image URL:", data.url);
      } catch (uploadError) {
        setError(
          uploadError instanceof Error ? uploadError.message : "Upload failed.",
        );
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const categoryCount = useMemo(() => {
    return new Set(products.map((product) => product.category)).size;
  }, [products]);

  return (
    <main className="min-h-screen bg-white pb-24 text-black select-none">
      <section className="mb-12 border-b border-zinc-900 bg-black py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:px-8 md:flex-row md:items-center">
          <div>
            <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              Barrison Gadgets
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Products Inventory Dashboard
              <span className="text-red-500">.</span>
            </h1>
          </div>
          <div className="border border-zinc-800 bg-zinc-900 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            [ ACTIVE_LEDGER: {products.length} ITEMS ]
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-12">
        <div className="sticky top-28 h-fit border border-zinc-100 bg-zinc-50 p-8 lg:col-span-5">
          <div className="mb-6 flex items-center gap-2 border-b border-zinc-200/60 pb-4">
            <FiCpu className="h-4 w-4 text-red-600" />
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">
              Upload New Product
            </h2>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-5">
            <div>
              <label className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Product Name
              </label>
              <div className="flex items-center border-b border-zinc-200 py-2 transition-colors focus-within:border-black">
                <FiFileText className="mr-3 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AeroWireless Slim 10K"
                  className="w-full bg-transparent text-xs font-semibold uppercase tracking-wider text-black placeholder-zinc-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Detailed Description
              </label>
              <div className="flex items-start border-b border-zinc-200 py-2 transition-colors focus-within:border-black">
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ENTER HARDWARE COMPOSITE AND SPECIFICATIONS SUMMARY DESCRIPTION..."
                  className="w-full resize-none bg-transparent pt-0.5 text-xs font-medium uppercase tracking-wider text-black placeholder-zinc-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Price (NGN)
              </label>
              <div className="flex items-center border-b border-zinc-200 py-2 transition-colors focus-within:border-black">
                <span className="mr-2 text-xs font-bold text-zinc-400">₦</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="145000"
                  className="w-full bg-transparent text-xs font-mono font-bold tracking-wider text-black placeholder-zinc-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                Image Vector
              </label>
              <div className="flex items-center border-b border-zinc-200 py-2 transition-colors focus-within:border-black">
                <FiImage className="mr-3 h-4 w-4 text-zinc-400" />
                <input
                  type="file"
                  accept="image/*"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="e.g. /products/powerbank-1.png"
                  className="w-full bg-transparent text-xs font-medium tracking-wider text-black placeholder-zinc-300 focus:outline-none"
                />
              </div>
              <input
                name="image"
                value={imageUrl}
                readOnly
                placeholder="Image URL will appear here after upload"
                className="bg-white border-muted/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                System Catalog Classification Taxonomy
              </label>
              <Select
                value={category}
                onValueChange={(val) =>
                  setCategory(val as AdminProduct["category"])
                }
              >
                <SelectTrigger className="h-11 w-full rounded-none border border-zinc-200 bg-white text-xs font-bold uppercase tracking-widest text-black focus:ring-1 focus:ring-black">
                  <SelectValue placeholder="SELECT CATEGORY MATRIX" />
                </SelectTrigger>
                <SelectContent className="rounded-none border border-zinc-200 bg-white shadow-xl">
                  <SelectItem
                    value="appliances"
                    className="py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50"
                  >
                    Appliances
                  </SelectItem>
                  <SelectItem
                    value="electronics"
                    className="py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50"
                  >
                    Electronics
                  </SelectItem>
                  <SelectItem
                    value="fashion"
                    className="py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50"
                  >
                    Fashion
                  </SelectItem>
                  <SelectItem
                    value="phones & tablets"
                    className="py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50"
                  >
                    Phones & Tablets
                  </SelectItem>
                  <SelectItem
                    value="computing"
                    className="py-3 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50"
                  >
                    Computing
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full rounded-none bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-zinc-800"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </form>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <FiGrid className="h-4 w-4 text-red-600" />
                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                  Inventory Queue
                </h2>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {products.length} live products • {categoryCount} active
                categories
              </p>
            </div>
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Admin Workspace
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {products.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-none border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                No products yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

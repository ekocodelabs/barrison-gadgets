"use client";

import React, { useEffect, useMemo, useState } from "react";
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

export default function AddProductPageLayout() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<AdminProduct["category"] | "">("");
  // State for upload status and errors
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load products");
      }

      const normalizedProducts = (
        Array.isArray(data) ? data : data.products || []
      ).map((product: any) => ({
        id: product.id ?? product._id?.toString?.() ?? String(product._id),
        title: product.title,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        category: product.category,
      }));

      setProducts(normalizedProducts);
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load products",
      );
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price || !imageUrl || !category) {
      setError("Please upload an image and fill in all required fields.");
      return;
    }

    try {
      setError(null);
      setSubmitting(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          image: imageUrl,
          category,
          inStock: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to create product");
      }

      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setImageUrl("");
      setCategory("");
      await loadProducts();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Failed to create product",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: number | string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this design? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      setError(null);
      const response = await fetch(
        `/api/products?id=${encodeURIComponent(String(id))}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete product");
      }

      await loadProducts();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete product",
      );
    }
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
                  onChange={handleFileChange}
                  className="w-full bg-transparent text-xs font-medium tracking-wider text-black placeholder-zinc-300 focus:outline-none"
                />
              </div>
              {uploading ? (
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Uploading image...
                </p>
              ) : null}
              <input
                name="image"
                value={imageUrl}
                readOnly
                placeholder="Image URL will appear here after upload"
                className="mt-2 w-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium tracking-wider text-black placeholder-zinc-300 focus:outline-none"
              />
              {error ? (
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-red-600">
                  {error}
                </p>
              ) : null}
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
              disabled={submitting || uploading}
              className="w-full rounded-none bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              <FiPlus
                className={`mr-2 h-4 w-4 ${submitting ? "animate-spin" : ""}`}
              />
              {submitting ? "Creating Product..." : "Add Product"}
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
                {loadingProducts ? "Loading" : products.length} live products •{" "}
                {categoryCount} active categories
              </p>
            </div>
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Admin Workspace
            </div>
          </div>

          {loadingProducts ? (
            <div className="rounded-none border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Loading products from the database...
              </p>
            </div>
          ) : products.length > 0 ? (
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

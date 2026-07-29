"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiTruck,
  FiCreditCard,
  FiLock,
  FiCheckCircle,
  FiHash,
  FiGlobe,
  FiHome,
  FiMapPin,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { IProduct } from "@/models/Products";

export default function CheckoutPageLayout() {
  //pull the array of cart items from the zustand store
  const { cartItems, clearCart } = useCartStore();
  const { data: session } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const fetchCart = useCartStore((state) => state.fetchCartItems);
  const fetchUserData = useCartStore((state) => state.fetchUserData);

  // Form State Capture Elements
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "delivery">(
    "online",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // 1. Structure the shipping address using a clean nested object state matching your schema
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  //  Uniform event abstraction handling nested property mutations safely
  const handleAddressChange = (
    field: keyof typeof shippingAddress,
    value: string,
  ) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Client side evaluation mapping required verification conditions before submitting
  const isFormValid =
    phone.trim() !== "" &&
    shippingAddress.street.trim() !== "" &&
    shippingAddress.city.trim() !== "" &&
    shippingAddress.state.trim() !== "" &&
    shippingAddress.postalCode.trim() !== "";

  // Structural Processing Operation Handlers
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    if (!session?.user?.email) {
      console.error("Checkout failed: user is not authenticated.");
      setIsSubmitting(false);
      return;
    }

    const orderItems = cartProducts.map((product) => {
      const productId = product._id?.toString() ?? product.id?.toString() ?? "";
      const quantity = Number(quantities[productId] || "1");
      return {
        productId,
        title: product.title,
        quantity,
        price: product.price,
      };
    });

    const payload = {
      customerEmail: session.user.email,
      phoneNumber: phone,
      shippingAddress,
      paymentMethod,
      totalPrice: grandTotal,
      orderItems,
    };

    if (paymentMethod == "delivery") {
      //call api endpoint to submit the order
      fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setIsSuccess(true);
            clearCart();
          }
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });

      console.log("Transmitting order transaction package payload...", payload);
      // Simulate pipeline connection latency
      setTimeout(() => setIsSubmitting(false), 2000);
    }

    if (paymentMethod == "online") {
      //call paystack endpoint
      fetch("/api/pay/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          const authorizationUrl =
            data?.paystack?.data?.authorization_url ||
            data?.paystack?.authorization_url ||
            data?.data?.authorization_url;

          if (authorizationUrl) {
            window.location.href = authorizationUrl;
            return;
          }

          if (data.success) {
            setIsSuccess(true);
            clearCart();
          } else {
            console.error("Paystack initialization failed:", data);
          }
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });

      console.log("Transmitting order transaction package payload...", payload);
      // Simulate pipeline connection latency
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  }

  const quantities = React.useMemo(
    () =>
      cartItems.reduce<Record<string, string>>((acc, item) => {
        acc[item.productId] = String(item.quantity || 1);
        return acc;
      }, {}),
    [cartItems],
  );

  const cartProducts = React.useMemo(() => {
    const cartIds = new Set(cartItems.map((item) => item.productId));
    return products.filter((product) => {
      const productId = product._id?.toString() ?? product.id?.toString();
      return productId ? cartIds.has(productId) : false;
    });
  }, [products, cartItems]);

  const subtotal = cartProducts.reduce((sum, product) => {
    const productId = product._id?.toString() ?? product.id?.toString() ?? "";
    const quantity = Number(quantities[productId] || "1");
    return sum + product.price * quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 6000 : 0;
  const grandTotal = subtotal + deliveryFee;

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
        const response = await fetch("/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Product not found");
        }

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
        if (isMounted) {
          setErrorStatus(
            error instanceof Error ? error.message : "Failed to load product",
          );
          setProducts([]);
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
  }, [session, fetchCart, fetchUserData]);

  if (isSuccess) {
    return (
      <main className="min-h-[75vh] bg-white flex flex-col items-center justify-center px-6">
        <FiCheckCircle className="h-16 w-16 text-red-600 mb-6 animate-pulse" />
        <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mb-3">
          Transaction Authorized
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4 text-center">
          Order Deployed Successfully
        </h1>
        <p className="text-zinc-500 text-xs font-light max-w-sm text-center uppercase tracking-wide mb-8 leading-relaxed">
          Your hardware allocation is secured. Logistics updates will dispatch
          shortly to terminal reference {phone}.
        </p>
        <Link href="/products">
          <Button className="bg-black hover:bg-red-600 text-white text-xs tracking-widest uppercase rounded-none px-8 py-5">
            Return to Core Catalog
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen py-16 text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Nav Header Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-zinc-400 hover:text-black uppercase transition-colors mb-8"
        >
          <FiArrowLeft className="h-4 w-4" /> Return to Cart Matrix
        </Link>

        {/* Structural Two-Column Core Grid split frame layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Frame column: Processing Delivery & Payment Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="border-b border-zinc-100 pb-6 mb-10">
              <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-2">
                Secure Gateway
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight">
                Fulfillment Terminal<span className="text-red-600">.</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Details Block */}
              <div>
                <h2 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-4">
                  01 // Logistics Coordinates
                </h2>
                <div className="space-y-6">
                  {/* Street Address Input Field */}
                  <div className="flex flex-col border-b border-zinc-200 focus-within:border-black transition-colors py-2">
                    <label className="text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 flex items-center gap-2">
                      <FiHome className="text-zinc-400 h-3 w-3" /> Street
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12 Architectural Avenue, Victoria Island"
                      value={shippingAddress.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                      className="bg-transparent text-sm font-light text-black placeholder-zinc-300 focus:outline-none w-full uppercase tracking-wide"
                    />
                  </div>

                  {/* City & State Split Row Matrix (Cleans up layout footprint vertically) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* City Field */}
                    <div className="flex flex-col border-b border-zinc-200 focus-within:border-black transition-colors py-2">
                      <label className="text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 flex items-center gap-2">
                        <FiMapPin className="text-zinc-400 h-3 w-3" /> City /
                        Locality
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ikoyi"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        className="bg-transparent text-sm font-light text-black placeholder-zinc-300 focus:outline-none w-full uppercase tracking-wide"
                      />
                    </div>

                    {/* State Field */}
                    <div className="flex flex-col border-b border-zinc-200 focus-within:border-black transition-colors py-2">
                      <label className="text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 flex items-center gap-2">
                        <FiGlobe className="text-zinc-400 h-3 w-3" /> State /
                        Region
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lagos"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          handleAddressChange("state", e.target.value)
                        }
                        className="bg-transparent text-sm font-light text-black placeholder-zinc-300 focus:outline-none w-full uppercase tracking-wide"
                      />
                    </div>
                  </div>

                  {/* Postal Code & Phone Number Split Row Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Postal Code Field */}
                    <div className="flex flex-col border-b border-zinc-200 focus-within:border-black transition-colors py-2">
                      <label className="text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1 flex items-center gap-2">
                        <FiHash className="text-zinc-400 h-3 w-3" /> Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 101233"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          handleAddressChange("postalCode", e.target.value)
                        }
                        className="bg-transparent text-sm font-light text-black placeholder-zinc-300 focus:outline-none w-full font-mono tracking-widest"
                      />
                    </div>

                    {/* Phone Contact Field */}
                    <div className="flex flex-col border-b border-zinc-200 focus-within:border-black transition-colors py-2">
                      <label className="text-[10px] font-black tracking-wider uppercase text-zinc-400 mb-1">
                        Active Phone Contact
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-transparent text-sm font-light text-black placeholder-zinc-300 focus:outline-none w-full tracking-wider"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Select Interface Configuration */}
              <div>
                <h2 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-4">
                  02 // Transaction Protocol
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option Pay Online */}
                  <div
                    onClick={() => setPaymentMethod("online")}
                    className={`border p-5 cursor-pointer flex flex-col justify-between h-32 transition-all duration-300 rounded-none ${
                      paymentMethod === "online"
                        ? "border-red-600 bg-red-50/10"
                        : "border-zinc-200 hover:border-black"
                    }`}
                  >
                    <FiCreditCard
                      className={`h-5 w-5 ${paymentMethod === "online" ? "text-red-600" : "text-zinc-400"}`}
                    />
                    <div>
                      <span className="text-xs font-black uppercase tracking-tight block text-black">
                        Pay Online
                      </span>
                      <span className="text-[9px] uppercase text-zinc-400 font-light tracking-wide">
                        Instant checkout verification deployment
                      </span>
                    </div>
                  </div>

                  {/* Option Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("delivery")}
                    className={`border p-5 cursor-pointer flex flex-col justify-between h-32 transition-all duration-300 rounded-none ${
                      paymentMethod === "delivery"
                        ? "border-red-600 bg-red-50/10"
                        : "border-zinc-200 hover:border-black"
                    }`}
                  >
                    <FiTruck
                      className={`h-5 w-5 ${paymentMethod === "delivery" ? "text-red-600" : "text-zinc-400"}`}
                    />
                    <div>
                      <span className="text-xs font-black uppercase tracking-tight block text-black">
                        Pay On Delivery
                      </span>
                      <span className="text-[9px] uppercase text-zinc-400 font-light tracking-wide">
                        Settlement at physical handoff terminal point
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Execution Action Button Submission */}
              <Button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full bg-black hover:bg-red-600 text-white font-black text-xs tracking-widest uppercase py-6 rounded-none transition-all duration-300 disabled:opacity-30 disabled:hover:bg-black"
              >
                {isSubmitting
                  ? "Authorizing Pipeline..."
                  : "Authorize System Transaction"}
              </Button>
            </form>
          </div>

          {/* Right Frame column: Sticky Asset Configuration Invoice (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-100 p-8">
            <h2 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-6 border-b border-zinc-200 pb-4">
              Manifest Composition
            </h2>

            {/* Micro List Matrix of items selected */}
            <div className="space-y-4 mb-8">
              {cartProducts.map((item) => (
                <div
                  key={item._id.toString()}
                  className="flex items-center gap-4 bg-white p-3 border border-zinc-100"
                >
                  <div className="relative h-14 w-14 border border-zinc-50 bg-zinc-50/50 p-1 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                  <div className="grow min-w-0">
                    <h3 className="text-xs font-bold text-zinc-900 uppercase truncate">
                      {item.title}
                    </h3>
                    <span className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest block">
                      QTY: 1 // {item.category}
                    </span>
                  </div>
                  <span className="text-xs font-black tracking-tight shrink-0">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown Matrix */}
            <div className="space-y-3 border-t border-zinc-200 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-light text-zinc-500 uppercase tracking-widest">
                  Subtotal
                </span>
                <span className="text-xs font-black text-black">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-light text-zinc-500 uppercase tracking-widest">
                  Delivery Fee
                </span>
                <span className="text-xs font-black text-black">
                  ₦{deliveryFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-zinc-200 pt-3 mt-3">
                <span className="text-xs font-black text-black uppercase tracking-widest">
                  Grand Total
                </span>
                <span className="text-lg font-black text-red-600">
                  ₦{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center gap-2 text-[9px] text-zinc-400 uppercase tracking-widest">
              <FiLock className="h-3 w-3" />
              Encrypted Secure Payment Gateway
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

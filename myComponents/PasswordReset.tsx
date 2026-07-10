"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMail,
  FiArrowRight,
  FiArrowLeft,
  FiCheckCircle,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function PasswordResetLayout() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const newPassword = formData.get("newpassword");

    try {
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "An unexpected error occurred during credential resetting.",
        );
      }

      setSuccessMessage(
        "Credentials updated. Directing to security gateway...",
      );

      // Delay slightly for premium feedback feel so users can read the success message
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || "Network layer exception.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // Full screen grid wrapper explicitly centering children vertically and horizontally
    <main className="min-h-screen w-full bg-red-600 flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Structural Minimalist Subtle Abstract Grid Lines */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[30px_30px]" />
      </div>

      {/* Centered High-End Pure Black Card Shell */}
      <div className="w-full max-w-md bg-black text-white p-8 sm:p-10 border border-zinc-900/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] z-10 relative">
        {/* Active Standard Intent Form Layout Block View */}
        <div className="mb-8">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase block mb-2">
            Barrison Gadgets.
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            Reset Password<span className="text-red-500">.</span>
          </h2>
          <p className="text-zinc-400 text-xs font-light mt-1 uppercase tracking-wider">
            Request a secure verification payload matrix to recover system
            access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registered Mail Account Mapping Field Entry */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
              Email Address
            </label>
            <div className="relative border-b border-zinc-800 focus-within:border-red-500 transition-colors py-2 flex items-center">
              <FiMail className="text-zinc-500 h-4 w-4 mr-3 shrink-0" />
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@barrison.com"
                className="w-full bg-transparent text-xs tracking-wider font-medium uppercase text-white placeholder-zinc-700 focus:outline-none"
              />
            </div>
          </div>
          {/* Password Input Field with Interactive View/Hide Payload Trigger Button */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
              Password
            </label>
            <div className="relative border-b border-zinc-800 focus-within:border-red-500 transition-colors py-2 flex items-center">
              <FiLock className="text-zinc-500 h-4 w-4 mr-3 shrink-0" />
              <input
                name="newpassword"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent text-xs tracking-wider font-medium text-white placeholder-zinc-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-500 hover:text-red-500 transition-colors ml-2 focus:outline-none"
                aria-label={
                  showPassword
                    ? "Hide password field payload"
                    : "Reveal password field payload"
                }
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Request Trigger Pipeline Button Core CTA */}
          <Button
            type="submit"
            className="w-full bg-white hover:bg-red-600 text-black hover:text-white font-black text-xs tracking-widest uppercase py-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 border border-transparent hover:border-white/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Reset"}{" "}
            <FiArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Structural Global Gateway Backtrack Anchor Link Option */}
        <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors"
          >
            <FiArrowLeft className="h-3.5 w-3.5" /> Back To Authentication
            Terminal
          </Link>
        </div>
      </div>
    </main>
  );
}

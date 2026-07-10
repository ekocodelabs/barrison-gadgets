"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPageLayout() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirect so we can handle errors
    });

    if (result?.error) {
      setError("Login failed: " + result.error);
      alert("Invalid credentials or unauthorized access.");
      setIsLoading(false);
    } else {
      // Success: Redirect to dashboard
      router.push("/");
      router.refresh(); // Clears any cached layout state
    }
  };

  return (
    // Full screen grid wrapper explicitly centering children vertically and horizontally
    <main className="min-h-screen w-full bg-red-600 flex items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      {/* Structural Minimalist Subtle Abstract Grid Lines */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[30px_30px]" />
      </div>

      {/* Floating System Architecture Return Node link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/80 hover:text-white uppercase transition-colors"
        >
          <FiArrowLeft className="h-4 w-4" /> System Core
        </Link>
      </div>

      {/* Centered High-End Pure Black Card Shell */}
      <div className="w-full max-w-md bg-black text-white p-8 sm:p-10 border border-zinc-900/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] z-10 relative">
        {/* Card Identity Header Block */}
        <div className="mb-8">
          <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase block mb-2">
            Barrion Gadgets.
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">
            LOGIN <span className="text-red-500">.</span>
          </h2>
          <p className="text-zinc-400 text-xs font-light mt-1 uppercase tracking-wider">
            Enter your login credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input Field */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-2">
              Email Address
            </label>
            <div className="relative border-b border-zinc-800 focus-within:border-red-500 transition-colors py-2 flex items-center">
              <FiMail className="text-zinc-500 h-4 w-4 mr-3 shrink-0" />
              <input
                name="email"
                type="type"
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
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                Password
              </label>
              <Link
                href="/reset"
                className="text-[10px] font-bold tracking-wider text-red-500 hover:text-white uppercase transition-colors"
              >
                Lost Password?
              </Link>
            </div>
            <div className="relative border-b border-zinc-800 focus-within:border-red-500 transition-colors py-2 flex items-center">
              <FiLock className="text-zinc-500 h-4 w-4 mr-3 shrink-0" />
              <input
                name="password"
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

          {/* Primary Action Button Core CTA */}
          <Button
            type="submit"
            className="w-full bg-white hover:bg-red-600 text-black hover:text-white font-black text-xs tracking-widest uppercase py-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 border border-transparent hover:border-white/20"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "LOGIN"}{" "}
            <FiArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Alternative Route Navigation Footer Anchor Link */}
        <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
          <p className="text-[11px] text-zinc-500 uppercase tracking-wide font-medium">
            New User?{" "}
            <Link
              href="/signup"
              className="text-red-500 font-bold hover:text-white transition-colors ml-1"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

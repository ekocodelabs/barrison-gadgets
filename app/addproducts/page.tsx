"use client";
import { Button } from "@/components/ui/button";
import AddProductPageLayout from "@/myComponents/AddProductPageLayout";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

// Extend Next-Auth module types inline if TypeScript throws a warning on session.user.role
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      role?: "user" | "admin";
    };
  }
}

type CurrentUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: "user" | "admin";
};

export default function AddProdcutsPage() {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      if (status !== "authenticated" || !session?.user?.email) {
        setCurrentUser(null);
        setUserLoading(false);
        return;
      }

      setUserLoading(true);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          setCurrentUser(null);
          return;
        }
        const user = await res.json();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    }

    fetchCurrentUser();
  }, [session?.user?.email, status]);

  if (status === "loading" || userLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
          Verifying Credentials...
        </span>
      </div>
    );
  }

  const isAdmin = currentUser?.role === "admin";

  if (!session?.user?.email || !isAdmin) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-black select-none">
        <div className="flex flex-col items-center max-w-sm text-center">
          <FiAlertTriangle className="text-red-600 h-10 w-10 mb-4 animate-pulse" />

          <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase mb-2">
            Access Protocol Refused // Error 403
          </span>

          <h1 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-3">
            Unauthorized Node Terminal
          </h1>

          <p className="text-zinc-500 text-xs font-light leading-relaxed uppercase tracking-wide mb-8">
            Your current identity profile tracking matrix lacks administrative
            permission clearance metrics.
          </p>
          <Link href="/" className="w-full">
            <Button className="bg-black hover:bg-red-600 text-white text-xs font-bold tracking-widest uppercase rounded-none px-6 py-5 transition-all duration-300">
              <FiArrowLeft className="mr-2 h-4 w-4" /> Return to System Core
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div>
      <AddProductPageLayout />
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { FiShield, FiFileText, FiClock, FiCreditCard } from "react-icons/fi";

export const TermsOfUse: React.FC = () => {
  return (
    <main className="bg-white min-h-screen text-black pb-24 selection:bg-red-600 selection:text-white">
      {/* Minimalist Top Accent Header Line */}
      <div className="w-full h-1.5 bg-red-600" />

      {/* Structural Minimalist Page Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 border-b border-zinc-100">
        <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-3">
          Legal Framework // Doc.01
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-none mb-4">
          Terms of Use<span className="text-red-600">.</span>
        </h1>
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
          <FiClock className="text-red-600 h-3.5 w-3.5" />
          Last Compiled: August 2026
        </div>
      </section>

      {/* Narrative Section Matrix Stack */}
      <section className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        {/* Term Section 01 */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            01 // Global Acceptance Contract
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            By interacting with, provisioning an account on, or sourcing
            hardware deployments via the Barrison Gadgets computational commerce
            portal, you enter into a legally binding agreement to comply
            strictly with these Terms of Use. If you do not authorize these
            operational metrics, immediately terminate your server gateway
            interface connection.
          </p>
        </div>

        {/* Term Section 02 - E-Commerce Spec */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            02 // Account Security & Profile Terminal Nodes
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            When generating an identity within our database system, you bear
            absolute liability for safeguarding your credential matrices,
            encrypted passkeys, and validation data arrays. You agree to notify
            our support terminal instantly at{" "}
            <span className="font-medium text-black">
              concierge@barrison.com
            </span>{" "}
            if an unauthorized boundary breach or credential compromise is
            detected on your node trace.
          </p>
        </div>

        {/* Term Section 03 - Payments & Paystack / COD Spec */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            03 // Financial Protocol & Settlement Channels
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            Barrison Gadgets handles multi-tier financial checkout integrations
            including online credit/debit card routing (powered securely via the
            Paystack gateway matrix) and physical Cash on Delivery processes
            (NGN denomination valuations).
          </p>
          <ul className="space-y-2 pl-4 text-xs font-light text-zinc-600 uppercase tracking-wide">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-0.5">•</span> Online token
              handshakes are binding upon transaction authorization callbacks.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-0.5">•</span> Cash on Delivery
              arrays require absolute physical currency clearance at the point
              of hardware handoff. Failure to clear balances will freeze further
              order deployment traces.
            </li>
          </ul>
        </div>

        {/* Term Section 04 */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            04 // Inventory Mutations & Valuation Errors
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            We reserve the right to amend pricing matrices, stock level
            parameters, or terminate catalog availability fields without
            warning. In the event that a processing anomaly yields a corrupted
            inventory pricing error, Barrison Gadgets maintains the absolute
            right to drop, cancel, or refuse the corresponding order deployment
            run.
          </p>
        </div>

        {/* Legal Disclaimer Footer Note */}
        <div className="border-t border-zinc-100 pt-8 mt-16 text-center">
          <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
            [ SECURE COMPLIANCE LEDGER MATRIX // BARRISON HARDWARE ECOSYSTEM ]
          </p>
        </div>
      </section>
    </main>
  );
};

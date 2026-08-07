"use client";

import React from "react";
import { FiShield, FiLock, FiClock, FiEye } from "react-icons/fi";

export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-white min-h-screen text-black pb-24 selection:bg-red-600 selection:text-white">
      {/* Minimalist Top Accent Header Line */}
      <div className="w-full h-1.5 bg-red-600" />

      {/* Structural Minimalist Page Header */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 border-b border-zinc-100">
        <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase block mb-3">
          Data Encryption Protocol // Privacy.02
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-900 leading-none mb-4">
          Privacy Policy<span className="text-red-600">.</span>
        </h1>
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
          <FiShield className="text-red-600 h-3.5 w-3.5" />
          Classification Status: Encrypted Ledger
        </div>
      </section>

      {/* Narrative Section Matrix Stack */}
      <section className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        {/* Privacy Section 01 */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            01 // Data Stream Capture Parameters
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            When you register, initialize a checkout run, or authorize account
            configurations inside the Barrison ecosystem, we map and ingest the
            following explicit data payloads into our secure database network:
          </p>
          <ul className="space-y-2 pl-4 text-xs font-light text-zinc-600 uppercase tracking-wide">
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> First name, last name,
              telemetry contact lines, and mail address vectors.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Physical logistics
              delivery coordinates (street, city, state, postal code).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span> Metadata array state
              tracking flags (favorites watchlists and active cart cache items).
            </li>
          </ul>
        </div>

        {/* Privacy Section 02 - Cookie Spec */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            02 // Cookie Tracking & Persistent State Storage
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            Our platform drops small local cache variables ("Cookies") to
            maintain your active authentication JWT tokens, trace session
            survival metrics, and retain shopping cart choices across reboots.
            You can manually disable cookie data ingestion via your browser
            settings, but it will corrupt your authorization flow, locking you
            out of secure workspace page modules.
          </p>
        </div>

        {/* Privacy Section 03 - Payment Integration Spec */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            03 // Payment Processor Cryptographic Isolation
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            Barrison Gadgets **never** logs or stores credit/debit card numbers
            on its servers. When selecting online transaction methods, your
            credentials route directly to the Paystack gateway architecture via
            PCI-DSS compliant SSL encrypted connections. Our server records
            *only* retain metadata transaction callback strings (e.g., Paystack
            References) to authorize order generation loops.
          </p>
        </div>

        {/* Privacy Section 04 */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-red-600 rounded-none inline-block" />
            04 // Data Retention & Node Purging
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm font-light leading-relaxed">
            Your user information remains active within our database arrays for
            as long as your profile trace exists. If you decide to completely
            drop your identity node, submit an explicit data deletion directive
            message to our legal operations team. We will completely purge your
            profile parameters out of active memory blocks within 7 business
            days, excluding immutable legal financial ledger records.
          </p>
        </div>

        {/* Legal Disclaimer Footer Note */}
        <div className="border-t border-zinc-100 pt-8 mt-16 text-center">
          <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
            [ DATA SAFETY DEPLOYMENT COMPLIANCE // ADVANCED COMPUTE SECURE LOCK
            ]
          </p>
        </div>
      </section>
    </main>
  );
};

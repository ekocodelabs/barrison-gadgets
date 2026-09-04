import React from "react";
import Link from "next/link";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Brand Showcase Block */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <span className="text-xl font-black tracking-widest uppercase">
            Barrison<span className="text-red-600">.</span>
          </span>
          <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-sm">
            Curators of high-end computational luxury ecosystems, precision
            engineering, and lifestyle tech hardware for discerning digital
            modernists.
          </p>
        </div>

        {/* Newsletter Signup Integrated Form */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest uppercase text-zinc-300">
            Newsletter
          </span>
          <div className="flex w-full max-w-md border-b border-zinc-700 focus-within:border-red-600 transition-colors py-2">
            <input
              type="email"
              placeholder="Enter your premium mail address"
              className="w-full bg-transparent text-sm font-light text-white focus:outline-none placeholder-zinc-600"
            />
            <button className="text-zinc-400 hover:text-red-500 transition-colors px-2">
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Direct Contact Metrics */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest uppercase text-zinc-300">
            Contact Us
          </span>
          <a
            href="mailto:concierge@barrison.com"
            className="flex items-center gap-2 text-zinc-400 hover:text-red-500 text-xs transition-colors group"
          >
            <FiMail className="h-4 w-4 text-red-600 group-hover:text-red-500" />
            concierge@barrison.com
          </a>

          {/* Social Network Interconnects */}
          <div className="flex gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <FiInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white transition-all duration-300"
              aria-label="Twitter"
            >
              <FiTwitter className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white transition-all duration-300"
              aria-label="Facebook"
            >
              <FiFacebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Sub-Footer Terms Matrix */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
        <p>
          &copy; {new Date().getFullYear()} Barrison Gadgets. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link
            href="/termsofuse"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>
        <p>
          Developed by{" "}
          <a
            href="https://ekocodelabs.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Ekocodelabs
          </a>
        </p>
      </div>
    </footer>
  );
};

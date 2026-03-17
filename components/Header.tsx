"use client";

import Link from "next/link";
import { tools } from "@/lib/tools-registry";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
            F
          </div>
          <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {process.env.NEXT_PUBLIC_SITE_NAME || "Free Online Tools Pro"}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {tools.slice(0, 5).map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
          <Link
            href="/#tools"
            className="px-3 py-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium"
          >
            All Tools
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden glass border-t border-white/5 px-4 py-3">
          <div className="grid grid-cols-2 gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {tool.icon} {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "freeonlinetoo-21";

interface Store {
  name: string;
  icon: string;
  color: string;
  getUrl: (query: string) => string;
  tip: string;
}

const stores: Store[] = [
  {
    name: "Amazon",
    icon: "📦",
    color: "bg-yellow-500 hover:bg-yellow-600",
    getUrl: (q) =>
      `https://www.amazon.fr/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}`,
    tip: "Best for fast shipping & reviews",
  },
  {
    name: "AliExpress",
    icon: "🏪",
    color: "bg-red-500 hover:bg-red-600",
    getUrl: (q) =>
      `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(q)}`,
    tip: "Cheapest prices, longer shipping",
  },
  {
    name: "eBay",
    icon: "🏷️",
    color: "bg-indigo-500/100 hover:bg-indigo-600",
    getUrl: (q) =>
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}&_sop=15`,
    tip: "Great for deals & used items",
  },
  {
    name: "Walmart",
    icon: "🛒",
    color: "bg-blue-700 hover:bg-blue-800",
    getUrl: (q) =>
      `https://www.walmart.com/search?q=${encodeURIComponent(q)}`,
    tip: "Competitive prices & pickup",
  },
  {
    name: "Target",
    icon: "🎯",
    color: "bg-red-600 hover:bg-red-700",
    getUrl: (q) =>
      `https://www.target.com/s?searchTerm=${encodeURIComponent(q)}`,
    tip: "Quality brands & same-day delivery",
  },
  {
    name: "Google Shopping",
    icon: "🔍",
    color: "bg-green-600 hover:bg-green-700",
    getUrl: (q) =>
      `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}`,
    tip: "Compare prices across all stores",
  },
];

const popularSearches = [
  "AirPods Pro alternative",
  "Dyson Airwrap dupe",
  "Stanley cup cheaper",
  "Lululemon leggings dupe",
  "Nike Air Force 1 alternative",
  "YSL perfume dupe",
  "iPad case cheap",
  "Mechanical keyboard budget",
];

export default function DealFinderPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const search = (q?: string) => {
    const term = q || query;
    if (!term.trim()) return;
    setSearchQuery(term);
    setSearched(true);
  };

  return (
    <ToolLayout
      title="Smart Deal Finder"
      description="Find the best deals and cheaper alternatives for any product. Compare prices across stores."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Enter a product name (e.g., 'AirPods Pro alternative')..."
            className="flex-1 p-4 border border-white/10 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
          />
          <button
            onClick={() => search()}
            disabled={!query.trim()}
            className="px-6 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            Find Deals
          </button>
        </div>

        {/* Popular Searches */}
        {!searched && (
          <div>
            <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    search(term);
                  }}
                  className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-full text-sm hover:bg-white/10 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searched && (
          <>
            <div className="text-center p-4 bg-indigo-500/10 rounded-lg">
              <p className="text-indigo-300 font-medium">
                Searching for &quot;{searchQuery}&quot; across 6 stores
              </p>
              <p className="text-sm text-indigo-400 mt-1">
                Click any store to see their prices and deals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stores.map((store) => (
                <a
                  key={store.name}
                  href={store.getUrl(searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${store.color} text-white rounded-xl p-5 transition-all transform hover:scale-105 block`}
                >
                  <div className="text-2xl mb-2">{store.icon}</div>
                  <div className="font-bold text-lg">{store.name}</div>
                  <div className="text-sm opacity-90 mt-1">{store.tip}</div>
                  <div className="mt-3 text-sm font-medium opacity-75">
                    Search &quot;{searchQuery}&quot; →
                  </div>
                </a>
              ))}
            </div>

            {/* Pro Tips */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-semibold text-gray-100 mb-3">
                💡 Money-Saving Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  ✓ <strong>Compare prices</strong> — Click multiple stores to
                  find the best deal
                </li>
                <li>
                  ✓ <strong>Search for &quot;dupe&quot; or &quot;alternative&quot;</strong> — Find
                  cheaper versions of brand-name products
                </li>
                <li>
                  ✓ <strong>Check AliExpress</strong> — Often 50-80% cheaper for
                  the same product
                </li>
                <li>
                  ✓ <strong>Read reviews</strong> — Sort by most recent to get
                  honest feedback
                </li>
                <li>
                  ✓ <strong>Use Google Shopping</strong> — See prices from ALL
                  stores at once
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setSearched(false);
                setQuery("");
              }}
              className="w-full py-3 bg-white/5 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Search Another Product
            </button>
          </>
        )}
      </div>
    </ToolLayout>
  );
}

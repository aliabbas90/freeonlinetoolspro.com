"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

const CATEGORIES: Record<string, string[]> = {
  Smileys: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😊","😇","🥰","😍","🤩","😘","😗","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🥵","🥶","😱","😨","😰","😥","😢","😭","😤","😡","🤬"],
  Gestures: ["👍","👎","👊","✊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","💪","👈","👉","👆","👇","✌️","🤞","🤟","🤘","👌","🤏","🤙"],
  Hearts: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💝","💘"],
  Animals: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🦆","🦅","🦉","🦇","🐺","🐗"],
  Food: ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🍕","🍔","🍟","🌭","🍿","🧁","🍩","🍪"],
};

const CATEGORY_NAMES = Object.keys(CATEGORIES);

export default function EmojiPickerPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORY_NAMES[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const filteredEmojis = useMemo(() => {
    if (!search.trim()) return null;
    const all: string[] = [];
    for (const emojis of Object.values(CATEGORIES)) {
      all.push(...emojis);
    }
    // For emoji search, just show all since emojis don't have text names here
    // But if search matches a category name, show that category
    const lowerSearch = search.toLowerCase();
    const matchedCategories = CATEGORY_NAMES.filter((c) => c.toLowerCase().includes(lowerSearch));
    if (matchedCategories.length > 0) {
      const result: string[] = [];
      for (const cat of matchedCategories) {
        result.push(...CATEGORIES[cat]);
      }
      return result;
    }
    return all;
  }, [search]);

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1500);
  };

  const displayEmojis = filteredEmojis ?? CATEGORIES[activeCategory];

  return (
    <ToolLayout
      title="Emoji Picker"
      description="Search, browse, and copy emojis with one click."
    >
      <div className="space-y-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Search categories (e.g. hearts, animals, food...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Category tabs */}
        {!filteredEmojis && (
          <div className="flex flex-wrap gap-2">
            {CATEGORY_NAMES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Emoji grid */}
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1">
          {displayEmojis.map((emoji, i) => (
            <button
              key={`${emoji}-${i}`}
              onClick={() => copyEmoji(emoji)}
              className="relative aspect-square flex items-center justify-center text-2xl rounded-lg hover:bg-white/10 transition-colors"
              title="Click to copy"
            >
              {emoji}
              {copied === emoji && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Copied feedback bar */}
        {copied && (
          <div className="text-center text-sm text-indigo-400">
            {copied} copied to clipboard!
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function TextToolsPage() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim()).length
      : 0,
    lines: text.trim() ? text.split("\n").length : 0,
    paragraphs: text.trim()
      ? text.split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0,
  };

  const readingTime = Math.max(1, Math.ceil(stats.words / 200));

  const transform = (fn: (s: string) => string) => setText(fn(text));

  const toSlug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const toTitleCase = (s: string) =>
    s.replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

  const copy = () => navigator.clipboard.writeText(text);

  return (
    <ToolLayout
      title="Free Online Text Tools"
      description="Word counter, character counter, case converter, slug generator, and more."
    >
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
        />

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-900">{val}</div>
              <div className="text-xs text-gray-500 capitalize">{key}</div>
            </div>
          ))}
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              {readingTime}m
            </div>
            <div className="text-xs text-gray-500">Read time</div>
          </div>
        </div>

        {/* Transform Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => transform((s) => s.toUpperCase())}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => transform((s) => s.toLowerCase())}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
          >
            lowercase
          </button>
          <button
            onClick={() => transform(toTitleCase)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
          >
            Title Case
          </button>
          <button
            onClick={() => transform(toSlug)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
          >
            slug-case
          </button>
          <button
            onClick={() => transform((s) => s.trim().replace(/\s+/g, " "))}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
          >
            Remove Extra Spaces
          </button>
          <button
            onClick={() =>
              transform((s) =>
                s
                  .split("\n")
                  .filter((l) => l.trim())
                  .join("\n")
              )
            }
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm transition-colors"
          >
            Remove Empty Lines
          </button>
          <button
            onClick={copy}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm transition-colors"
          >
            Copy Text
          </button>
          <button
            onClick={() => setText("")}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}

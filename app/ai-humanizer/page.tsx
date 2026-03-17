"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

const DAILY_LIMIT = 3;

export default function AiHumanizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tone, setTone] = useState("casual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [usesLeft, setUsesLeft] = useState(DAILY_LIMIT);

  useEffect(() => {
    const stored = localStorage.getItem("humanizer_uses");
    if (stored) {
      const { count, date } = JSON.parse(stored);
      const today = new Date().toDateString();
      if (date === today) {
        setUsesLeft(Math.max(0, DAILY_LIMIT - count));
      } else {
        localStorage.setItem(
          "humanizer_uses",
          JSON.stringify({ count: 0, date: today })
        );
        setUsesLeft(DAILY_LIMIT);
      }
    } else {
      localStorage.setItem(
        "humanizer_uses",
        JSON.stringify({ count: 0, date: new Date().toDateString() })
      );
    }
  }, []);

  const trackUse = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("humanizer_uses");
    let count = 0;
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) count = data.count;
    }
    count++;
    localStorage.setItem(
      "humanizer_uses",
      JSON.stringify({ count, date: today })
    );
    setUsesLeft(Math.max(0, DAILY_LIMIT - count));
  };

  const humanize = async () => {
    if (!input.trim() || loading) return;
    if (usesLeft <= 0) {
      setError("Daily limit reached. Come back tomorrow for 3 more free uses!");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setOutput(data.result);
      trackUse();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones = [
    { value: "casual", label: "Casual", desc: "Friendly & natural" },
    { value: "professional", label: "Professional", desc: "Polished & clean" },
    { value: "academic", label: "Academic", desc: "Scholarly & structured" },
    { value: "creative", label: "Creative", desc: "Engaging & unique" },
  ];

  return (
    <ToolLayout
      title="AI Text Humanizer"
      description="Make AI-generated text sound natural and human-written. Bypass AI detection."
    >
      <div className="space-y-5">
        {/* Uses Counter */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Paste your AI-generated text below
          </span>
          <span
            className={`text-sm font-medium ${
              usesLeft > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {usesLeft} free {usesLeft === 1 ? "use" : "uses"} left today
          </span>
        </div>

        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste AI-generated text here (ChatGPT, Claude, Gemini, etc.)..."
          className="w-full h-44 p-4 border border-white/10 rounded-xl text-gray-100 bg-white/5 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none outline-none"
          maxLength={5000}
        />
        <div className="text-xs text-gray-500 text-right">
          {input.length}/5000 characters
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Output Tone
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`p-3 rounded-xl text-sm text-left transition-all ${
                  tone === t.value
                    ? "bg-indigo-600 text-white border border-indigo-500"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="font-medium">{t.label}</div>
                <div
                  className={`text-xs mt-0.5 ${
                    tone === t.value ? "text-indigo-200" : "text-gray-500"
                  }`}
                >
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={humanize}
          disabled={!input.trim() || loading || usesLeft <= 0}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Humanizing...
            </span>
          ) : (
            "Humanize Text"
          )}
        </button>

        {/* Output */}
        {output && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-400">
                Humanized Result
              </span>
              <button
                onClick={copy}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
              >
                {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>
            <div className="p-5 bg-white/5 border border-green-500/20 rounded-xl text-gray-200 leading-relaxed whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-white/5 rounded-xl p-5 space-y-2">
          <h3 className="font-semibold text-gray-200">How it works</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>1. Paste text from ChatGPT, Claude, Gemini, or any AI</li>
            <li>2. Choose your desired tone</li>
            <li>
              3. Click &quot;Humanize&quot; — our AI rewrites it to sound
              natural
            </li>
            <li>4. Copy the result — it reads like a real person wrote it</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

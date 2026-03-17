"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError("Invalid input. Please check and try again.");
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      title="Free URL Encoder & Decoder"
      description="Encode or decode URLs instantly. Handle special characters in URLs with ease."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("encode"); setOutput(""); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "encode"
                ? "bg-indigo-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode("decode"); setOutput(""); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === "decode"
                ? "bg-indigo-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Decode
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Enter URL or text to encode..."
              : "Enter encoded URL to decode..."
          }
          className="w-full h-32 p-4 border border-white/10 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none text-gray-100 bg-gray-900"
          spellCheck={false}
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={process}
            disabled={!input.trim()}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 disabled:opacity-50 transition-colors"
          >
            {mode === "encode" ? "Encode URL" : "Decode URL"}
          </button>
          {output && (
            <button
              onClick={swap}
              className="px-4 py-3 bg-white/5 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              ⇄
            </button>
          )}
        </div>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-400">Result:</label>
              <button
                onClick={copy}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm font-mono break-all whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

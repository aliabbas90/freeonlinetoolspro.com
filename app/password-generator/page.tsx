"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (x) => chars[x % chars.length]).join("");
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = () => {
    let pool = 0;
    if (uppercase) pool += 26;
    if (lowercase) pool += 26;
    if (numbers) pool += 10;
    if (symbols) pool += 26;
    const entropy = Math.log2(Math.pow(pool || 26, length));
    if (entropy < 40) return { label: "Weak", color: "text-red-600", bg: "bg-red-200", width: "25%" };
    if (entropy < 60) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-200", width: "50%" };
    if (entropy < 80) return { label: "Strong", color: "text-indigo-400", bg: "bg-blue-200", width: "75%" };
    return { label: "Very Strong", color: "text-green-600", bg: "bg-green-200", width: "100%" };
  };

  const s = strength();

  return (
    <ToolLayout
      title="Free Password Generator"
      description="Generate strong, secure passwords instantly. Customize length, symbols, and more."
    >
      <div className="space-y-6">
        {/* Generated Password */}
        {password && (
          <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
            <code className="flex-1 text-lg font-mono break-all text-gray-100">
              {password}
            </code>
            <button
              onClick={copy}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {/* Strength Meter */}
        {password && (
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Strength</span>
              <span className={`font-medium ${s.color}`}>{s.label}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${s.bg} transition-all`}
                style={{ width: s.width }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div>
          <label className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Length: {length}</span>
          </label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", state: uppercase, set: setUppercase },
            { label: "Lowercase (a-z)", state: lowercase, set: setLowercase },
            { label: "Numbers (0-9)", state: numbers, set: setNumbers },
            { label: "Symbols (!@#$)", state: symbols, set: setSymbols },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="rounded"
              />
              {opt.label}
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
        >
          {password ? "Generate New Password" : "Generate Password"}
        </button>
      </div>
    </ToolLayout>
  );
}

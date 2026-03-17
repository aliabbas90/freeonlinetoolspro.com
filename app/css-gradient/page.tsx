"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function CssGradientPage() {
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);

  const gradient =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const css = `background: ${gradient};`;

  const copy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

  const randomize = () => {
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <ToolLayout
      title="Free CSS Gradient Generator"
      description="Create beautiful CSS gradients visually. Copy the CSS code with one click."
    >
      <div className="space-y-6">
        {/* Preview */}
        <div
          className="w-full h-48 rounded-xl shadow-inner"
          style={{ background: gradient }}
        />

        {/* Type */}
        <div className="flex gap-2">
          <button
            onClick={() => setType("linear")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              type === "linear"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Linear
          </button>
          <button
            onClick={() => setType("radial")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              type === "radial"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Radial
          </button>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Color 1</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm text-gray-900"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Color 2</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Angle */}
        {type === "linear" && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Angle: {angle}°
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* CSS Output */}
        <div className="relative">
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm">
            {css}
          </pre>
        </div>

        <div className="flex gap-3">
          <button
            onClick={copy}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
          <button
            onClick={randomize}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Randomize
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export default function ColorConverterPage() {
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState("99, 102, 241");
  const [hsl, setHsl] = useState("239, 84%, 67%");
  const [copiedField, setCopiedField] = useState("");

  const copy = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  }, []);

  const updateFromHex = (value: string) => {
    setHex(value);
    const rgbArr = hexToRgb(value);
    if (rgbArr) {
      setRgb(`${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]}`);
      const hslArr = rgbToHsl(rgbArr[0], rgbArr[1], rgbArr[2]);
      setHsl(`${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%`);
    }
  };

  const updateFromRgb = (value: string) => {
    setRgb(value);
    const parts = value.split(",").map((s) => parseInt(s.trim(), 10));
    if (
      parts.length === 3 &&
      parts.every((p) => !isNaN(p) && p >= 0 && p <= 255)
    ) {
      const h = rgbToHex(parts[0], parts[1], parts[2]);
      setHex(h);
      const hslArr = rgbToHsl(parts[0], parts[1], parts[2]);
      setHsl(`${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%`);
    }
  };

  const updateFromHsl = (value: string) => {
    setHsl(value);
    const parts = value
      .replace(/%/g, "")
      .split(",")
      .map((s) => parseFloat(s.trim()));
    if (
      parts.length === 3 &&
      parts.every((p) => !isNaN(p)) &&
      parts[0] >= 0 &&
      parts[0] <= 360 &&
      parts[1] >= 0 &&
      parts[1] <= 100 &&
      parts[2] >= 0 &&
      parts[2] <= 100
    ) {
      const rgbArr = hslToRgb(parts[0], parts[1], parts[2]);
      setRgb(`${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]}`);
      setHex(rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]));
    }
  };

  // Get a valid color for preview
  const previewColor = hexToRgb(hex) ? hex : "#000000";

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL. Preview colors in real-time."
    >
      <div className="space-y-6">
        {/* Color picker and preview */}
        <div className="flex items-center gap-6">
          <div
            className="w-24 h-24 rounded-xl border border-white/10 shrink-0"
            style={{ backgroundColor: previewColor }}
          />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Pick a Color
            </label>
            <input
              type="color"
              value={previewColor}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full h-12 bg-gray-900 border border-white/10 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* HEX */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            HEX
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              placeholder="#6366f1"
              className="flex-1 bg-gray-900 border border-white/10 rounded-lg p-3 text-gray-100 outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={() => copy(hex, "hex")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm transition-colors"
            >
              {copiedField === "hex" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* RGB */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            RGB
          </label>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-gray-900 border border-white/10 rounded-lg overflow-hidden">
              <span className="text-gray-500 pl-3 select-none">rgb(</span>
              <input
                type="text"
                value={rgb}
                onChange={(e) => updateFromRgb(e.target.value)}
                placeholder="99, 102, 241"
                className="flex-1 bg-transparent text-gray-100 px-1 py-3 outline-none font-mono"
              />
              <span className="text-gray-500 pr-3 select-none">)</span>
            </div>
            <button
              onClick={() => copy(`rgb(${rgb})`, "rgb")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm transition-colors"
            >
              {copiedField === "rgb" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* HSL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            HSL
          </label>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-gray-900 border border-white/10 rounded-lg overflow-hidden">
              <span className="text-gray-500 pl-3 select-none">hsl(</span>
              <input
                type="text"
                value={hsl}
                onChange={(e) => updateFromHsl(e.target.value)}
                placeholder="239, 84%, 67%"
                className="flex-1 bg-transparent text-gray-100 px-1 py-3 outline-none font-mono"
              />
              <span className="text-gray-500 pr-3 select-none">)</span>
            </div>
            <button
              onClick={() => copy(`hsl(${hsl})`, "hsl")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm transition-colors"
            >
              {copiedField === "hsl" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState, useRef } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";

export default function QRCodePage() {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: 512,
        margin: 2,
        color: { dark: color, light: bgColor },
      });
      setQrDataUrl(url);
    } catch {
      alert("Failed to generate QR code. Please try different text.");
    }
  };

  const download = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolLayout
      title="Free QR Code Generator"
      description="Generate QR codes for URLs, text, WiFi, and more. Download as PNG instantly."
    >
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL, text, or any content..."
          className="w-full h-32 p-4 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none text-gray-100"
        />

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            Background:
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </label>
        </div>

        <button
          onClick={generateQR}
          disabled={!text.trim()}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate QR Code
        </button>

        {qrDataUrl && (
          <div className="flex flex-col items-center gap-4 pt-4">
            <img
              src={qrDataUrl}
              alt="Generated QR Code"
              className="max-w-[256px] rounded-lg shadow-sm"
            />
            <button
              onClick={download}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Download PNG
            </button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
}

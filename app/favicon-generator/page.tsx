"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function FaviconGeneratorPage() {
  const [text, setText] = useState("A");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(64);
  const [shape, setShape] = useState<"square" | "circle">("square");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const render = () => {
    const canvas = canvasRef.current!;
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, size, size);

    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = bgColor;
      ctx.fill();
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text.slice(0, 3), size / 2, size / 2 + 2);

    setPreview(canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    render();
  }, [text, bgColor, textColor, fontSize, shape]);

  const downloadPng = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = "favicon.png";
    a.click();
  };

  const downloadIco = () => {
    const canvas = canvasRef.current!;
    const tempCanvas = document.createElement("canvas");

    // Generate 32x32 PNG as ICO substitute (browsers accept PNG favicons)
    tempCanvas.width = 32;
    tempCanvas.height = 32;
    const ctx = tempCanvas.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0, 32, 32);
    const dataUrl = tempCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "favicon.ico";
    a.click();
  };

  return (
    <ToolLayout
      title="Free Favicon Generator"
      description="Generate favicons from text or emoji. Download as ICO and PNG for your website."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Text or Emoji (max 3 chars)
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 3))}
                maxLength={3}
                className="w-full p-3 border border-white/10 rounded-lg text-2xl text-center text-gray-100 bg-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Background
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min={20}
                max={100}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Shape</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShape("square")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    shape === "square"
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  Square
                </button>
                <button
                  onClick={() => setShape("circle")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    shape === "circle"
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  Circle
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center justify-center gap-4">
            {preview && (
              <>
                <div className="bg-white/5 p-6 rounded-xl">
                  <img
                    src={preview}
                    alt="Favicon preview"
                    className="w-32 h-32"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/5 p-2 rounded">
                    <img src={preview} alt="16px" className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 p-2 rounded">
                    <img src={preview} alt="32px" className="w-8 h-8" />
                  </div>
                  <div className="bg-white/5 p-2 rounded">
                    <img src={preview} alt="48px" className="w-12 h-12" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Preview at 16px, 32px, 48px
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={downloadPng}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={downloadIco}
            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Download ICO
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
}

"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";

interface Color {
  hex: string;
  count: number;
}

export default function ColorPalettePage() {
  const [colors, setColors] = useState<Color[]>([]);
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extractColors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      const colorMap: Record<string, number> = {};
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 16) * 16;
        const g = Math.round(data[i + 1] / 16) * 16;
        const b = Math.round(data[i + 2] / 16) * 16;
        const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }

      const sorted = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([hex, count]) => ({ hex, count }));

      setColors(sorted);
    };
    img.src = URL.createObjectURL(file);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <ToolLayout
      title="Free Color Palette Extractor"
      description="Extract the dominant colors from any image. Get hex codes and copy with one click."
    >
      <div className="space-y-4">
        <label className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={extractColors}
            className="hidden"
          />
          <span className="text-gray-500">
            {fileName || "Click to upload an image"}
          </span>
        </label>

        {colors.length > 0 && (
          <>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => copyColor(c.hex)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                >
                  <div
                    className="w-full aspect-square rounded-lg"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-mono text-gray-700">
                    {copied === c.hex ? "Copied!" : c.hex}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-center text-gray-500">
              Click any color to copy its hex code
            </p>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
}

"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ImageResizePage() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("image/jpeg");
  const [keepAspect, setKeepAspect] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setOriginalSize(file.size);
    setResult(null);

    const img = new Image();
    img.onload = () => {
      setImage(img);
      setWidth(img.width);
      setHeight(img.height);
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (keepAspect && originalWidth > 0) {
      setHeight(Math.round((w / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (keepAspect && originalHeight > 0) {
      setWidth(Math.round((h / originalHeight) * originalWidth));
    }
  };

  const process = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL(format, quality / 100);
    setResult(dataUrl);
    setResultSize(Math.round((dataUrl.length * 3) / 4));
  };

  const download = () => {
    if (!result) return;
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
    const a = document.createElement("a");
    a.href = result;
    a.download = `resized.${ext}`;
    a.click();
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <ToolLayout
      title="Free Image Resizer & Compressor"
      description="Resize and compress images online. Reduce file size without losing quality. Runs in your browser."
    >
      <div className="space-y-4">
        <label className="block w-full p-8 border-2 border-dashed border-white/10 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
          <span className="text-gray-500">
            {fileName || "Click to upload an image (PNG, JPG, WebP)"}
          </span>
        </label>

        {image && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full p-2 border border-white/10 rounded-lg text-gray-100 bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full p-2 border border-white/10 rounded-lg text-gray-100 bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Quality (%)</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full p-2 border border-white/10 rounded-lg text-gray-100 bg-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full p-2 border border-white/10 rounded-lg text-gray-100 bg-gray-900"
                >
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={keepAspect}
                onChange={(e) => setKeepAspect(e.target.checked)}
                className="rounded"
              />
              Keep aspect ratio
            </label>

            <button
              onClick={process}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors"
            >
              Resize & Compress
            </button>

            {result && (
              <div className="flex flex-col items-center gap-4 pt-4">
                <div className="text-sm text-gray-400">
                  {formatBytes(originalSize)} → {formatBytes(resultSize)}
                  {resultSize < originalSize && (
                    <span className="text-green-600 font-medium ml-2">
                      ({Math.round((1 - resultSize / originalSize) * 100)}% smaller)
                    </span>
                  )}
                </div>
                <img
                  src={result}
                  alt="Resized"
                  className="max-w-full max-h-64 rounded-lg shadow-sm"
                />
                <button
                  onClick={download}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
}

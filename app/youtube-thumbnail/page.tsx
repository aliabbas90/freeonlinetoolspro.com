"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

interface Thumbnail {
  label: string;
  size: string;
  url: string;
}

export default function YoutubeThumbnailPage() {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [error, setError] = useState("");
  const [videoId, setVideoId] = useState("");

  const extractVideoId = (input: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getThumbnails = () => {
    setError("");
    const id = extractVideoId(url.trim());
    if (!id) {
      setError("Invalid YouTube URL. Please paste a valid YouTube video link.");
      setThumbnails([]);
      return;
    }
    setVideoId(id);
    setThumbnails([
      {
        label: "Maximum Resolution",
        size: "1280x720",
        url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      },
      {
        label: "Standard Definition",
        size: "640x480",
        url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
      },
      {
        label: "High Quality",
        size: "480x360",
        url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      },
      {
        label: "Medium Quality",
        size: "320x180",
        url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      },
      {
        label: "Default",
        size: "120x90",
        url: `https://img.youtube.com/vi/${id}/default.jpg`,
      },
    ]);
  };

  const download = async (thumb: Thumbnail) => {
    try {
      const response = await fetch(thumb.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${videoId}-${thumb.size}.jpg`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(thumb.url, "_blank");
    }
  };

  return (
    <ToolLayout
      title="Free YouTube Thumbnail Downloader"
      description="Download YouTube video thumbnails in all sizes. Just paste the video URL."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getThumbnails()}
            placeholder="Paste YouTube video URL here..."
            className="flex-1 p-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={getThumbnails}
            disabled={!url.trim()}
            className="px-6 py-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            Get Thumbnails
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {thumbnails.length > 0 && (
          <div className="space-y-4">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.size}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={thumb.url}
                  alt={thumb.label}
                  className="w-40 h-auto rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{thumb.label}</div>
                  <div className="text-sm text-gray-500">{thumb.size}</div>
                </div>
                <button
                  onClick={() => download(thumb)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);

  const metaTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">${keywords ? `\n<meta name="keywords" content="${keywords}">` : ""}${author ? `\n<meta name="author" content="${author}">` : ""}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">${image ? `\n<meta property="og:image" content="${image}">` : ""}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">${image ? `\n<meta property="twitter:image" content="${image}">` : ""}`;

  const copy = () => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Free Meta Tag Generator for SEO"
      description="Generate SEO meta tags for your website. Preview how your page looks on Google."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Page Title <span className="text-gray-400">({title.length}/60)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Website"
                maxLength={60}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Description <span className="text-gray-400">({description.length}/160)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your page..."
                maxLength={160}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">OG Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.png"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            {/* Google Preview */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Google Preview
              </label>
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="text-sm text-green-700 truncate">
                  {url || "https://example.com"}
                </div>
                <div className="text-lg text-blue-800 hover:underline cursor-pointer truncate">
                  {title || "Page Title"}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {description || "Page description will appear here..."}
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-600">Generated Code</label>
                <button
                  onClick={copy}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs font-mono max-h-64">
                {metaTags}
              </pre>
            </div>
          </div>
        </div>

        <button
          onClick={copy}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {copied ? "Copied!" : "Copy Meta Tags"}
        </button>
      </div>
    </ToolLayout>
  );
}

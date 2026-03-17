"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(`# Hello World

This is a **free online markdown editor** with live preview.

## Features
- Real-time preview
- Export to HTML
- Common markdown syntax

### Code Block
\`\`\`javascript
const greeting = "Hello!";
console.log(greeting);
\`\`\`

### Links & Images
[Visit Google](https://google.com)

### Table
| Name | Role |
|------|------|
| Alice | Developer |
| Bob | Designer |

> This is a blockquote. Great for highlighting important text.

---

That's it! Start editing on the left to see changes here.`);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"split" | "editor" | "preview">("split");

  const toHtml = (md: string): string => {
    let html = md
      // Code blocks
      .replace(
        /```(\w*)\n([\s\S]*?)```/g,
        '<pre><code class="language-$1">$2</code></pre>'
      )
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Headers
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      // Bold & italic
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>'
      )
      // Blockquotes
      .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
      // Horizontal rule
      .replace(/^---$/gm, "<hr>")
      // Unordered lists
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      // Line breaks
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    // Wrap lists
    html = html.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");
    html = html.replace(/<\/ul><ul>/g, "");

    return `<p>${html}</p>`;
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(toHtml(markdown));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Free Online Markdown Editor"
      description="Write and preview Markdown in real-time. Export to HTML. Free online editor."
    >
      <div className="space-y-4">
        {/* View Toggle */}
        <div className="flex gap-2 justify-between">
          <div className="flex gap-1">
            {(["split", "editor", "preview"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  view === v
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={copyHtml}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {copied ? "Copied!" : "Copy HTML"}
          </button>
        </div>

        {/* Editor & Preview */}
        <div
          className={`grid gap-4 ${
            view === "split"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {(view === "split" || view === "editor") && (
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
              spellCheck={false}
            />
          )}
          {(view === "split" || view === "preview") && (
            <div
              className="w-full h-96 p-4 border border-gray-200 rounded-lg overflow-y-auto prose prose-sm max-w-none bg-white"
              dangerouslySetInnerHTML={{ __html: toHtml(markdown) }}
            />
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

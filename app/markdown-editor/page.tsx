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
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={copyHtml}
            className="text-sm text-indigo-400 hover:text-indigo-300"
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
              className="w-full h-96 p-4 border border-white/10 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none text-gray-100"
              spellCheck={false}
            />
          )}
          {(view === "split" || view === "preview") && (
            <div
              className="w-full h-96 p-4 border border-white/5 rounded-lg overflow-y-auto prose prose-sm prose-invert max-w-none bg-white/5 prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-indigo-400 prose-strong:text-white prose-code:text-green-400 prose-blockquote:text-gray-400 prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: toHtml(markdown) }}
            />
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

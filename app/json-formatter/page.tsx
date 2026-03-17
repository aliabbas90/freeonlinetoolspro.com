"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sample = () => {
    const json = {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: { street: "123 Main St", city: "New York", country: "US" },
      hobbies: ["reading", "coding", "gaming"],
    };
    setInput(JSON.stringify(json));
  };

  return (
    <ToolLayout
      title="Free JSON Formatter & Validator"
      description="Format, validate, and minify JSON data. Syntax highlighting and error detection."
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">Paste your JSON:</label>
          <button
            onClick={sample}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Load sample
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
          spellCheck={false}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={format}
            disabled={!input.trim()}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Format / Beautify
          </button>
          <button
            onClick={minify}
            disabled={!input.trim()}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Minify
          </button>
        </div>

        {output && (
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600">Result:</label>
              <button
                onClick={copy}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm font-mono max-h-96">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);

  const flags = `${flagG ? "g" : ""}${flagI ? "i" : ""}${flagM ? "m" : ""}`;

  const { highlighted, matches, error } = useMemo(() => {
    if (!pattern) {
      return { highlighted: testString, matches: [] as MatchInfo[], error: "" };
    }

    try {
      new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
    } catch (e: unknown) {
      return {
        highlighted: testString,
        matches: [] as MatchInfo[],
        error: (e as Error).message,
      };
    }

    const matchList: MatchInfo[] = [];
    let m: RegExpExecArray | null;
    const searchRegex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");

    while ((m = searchRegex.exec(testString)) !== null) {
      matchList.push({
        match: m[0],
        index: m.index,
        groups: m.slice(1),
      });
      if (m[0].length === 0) searchRegex.lastIndex++;
    }

    // Build highlighted string
    let result = "";
    let lastIndex = 0;
    for (const match of matchList) {
      const before = testString.slice(lastIndex, match.index);
      result += escapeHtml(before);
      result += `<mark class="bg-indigo-500/40 text-indigo-200 rounded px-0.5">${escapeHtml(match.match)}</mark>`;
      lastIndex = match.index + match.match.length;
    }
    result += escapeHtml(testString.slice(lastIndex));

    return { highlighted: result, matches: matchList, error: "" };
  }, [pattern, testString, flags]);

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/\n/g, "<br/>");
  }

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and debug regular expressions in real-time. See matches highlighted instantly."
    >
      <div className="space-y-6">
        {/* Pattern input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Regular Expression
          </label>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center bg-gray-900 border border-white/10 rounded-lg overflow-hidden">
              <span className="text-gray-500 pl-3 select-none">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 bg-transparent text-gray-100 px-2 py-3 outline-none font-mono"
              />
              <span className="text-gray-500 pr-3 select-none">/{flags}</span>
            </div>
          </div>
        </div>

        {/* Flags */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={flagG}
              onChange={(e) => setFlagG(e.target.checked)}
              className="rounded border-white/10 bg-gray-900 text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              <code className="text-indigo-400">g</code> Global
            </span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={flagI}
              onChange={(e) => setFlagI(e.target.checked)}
              className="rounded border-white/10 bg-gray-900 text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              <code className="text-indigo-400">i</code> Case Insensitive
            </span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={flagM}
              onChange={(e) => setFlagM(e.target.checked)}
              className="rounded border-white/10 bg-gray-900 text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              <code className="text-indigo-400">m</code> Multiline
            </span>
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            Invalid regex: {error}
          </div>
        )}

        {/* Test string */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Test String
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            rows={6}
            className="w-full bg-gray-900 border border-white/10 rounded-lg p-3 text-gray-100 outline-none focus:border-indigo-500 font-mono text-sm resize-y"
          />
        </div>

        {/* Highlighted result */}
        {testString && pattern && !error && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Matches Highlighted
            </label>
            <div
              className="bg-gray-900 border border-white/10 rounded-lg p-3 font-mono text-sm text-gray-100 whitespace-pre-wrap break-all min-h-[80px]"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )}

        {/* Match info */}
        {matches.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300">
                Match Count:
              </span>
              <span className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                {matches.length}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Match Details
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 border border-white/10 rounded-lg p-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 font-mono">#{i + 1}</span>
                      <code className="text-indigo-400 font-mono">
                        &quot;{m.match}&quot;
                      </code>
                      <span className="text-gray-500 text-xs">
                        index {m.index}
                      </span>
                    </div>
                    {m.groups.length > 0 && (
                      <div className="mt-2 pl-8 space-y-1">
                        {m.groups.map((g, gi) => (
                          <div key={gi} className="text-gray-400 text-xs">
                            <span className="text-gray-500">
                              Group {gi + 1}:
                            </span>{" "}
                            <code className="text-green-400">
                              &quot;{g ?? "undefined"}&quot;
                            </code>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {pattern && testString && !error && matches.length === 0 && (
          <div className="text-gray-500 text-sm text-center py-4">
            No matches found
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

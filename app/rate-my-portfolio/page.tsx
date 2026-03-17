"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

const DAILY_LIMIT = 2;

export default function RateMyPortfolioPage() {
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("mid");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usesLeft, setUsesLeft] = useState(DAILY_LIMIT);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_uses");
    if (stored) {
      const { count, date } = JSON.parse(stored);
      const today = new Date().toDateString();
      if (date === today) {
        setUsesLeft(Math.max(0, DAILY_LIMIT - count));
      } else {
        localStorage.setItem(
          "portfolio_uses",
          JSON.stringify({ count: 0, date: today })
        );
        setUsesLeft(DAILY_LIMIT);
      }
    } else {
      localStorage.setItem(
        "portfolio_uses",
        JSON.stringify({ count: 0, date: new Date().toDateString() })
      );
    }
  }, []);

  const trackUse = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("portfolio_uses");
    let count = 0;
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) count = data.count;
    }
    count++;
    localStorage.setItem(
      "portfolio_uses",
      JSON.stringify({ count, date: today })
    );
    setUsesLeft(Math.max(0, DAILY_LIMIT - count));
  };

  const analyze = async () => {
    if (!description.trim() || loading) return;
    if (usesLeft <= 0) {
      setError(
        "Daily limit reached. Come back tomorrow for 2 more free reviews!"
      );
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/rate-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, role, experience }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setOutput(data.result);
      trackUse();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scoreMatch = output.match(/SCORE:\s*(\d+)/);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

  const scoreColor =
    score !== null
      ? score >= 8
        ? "text-green-400 border-green-500/30 bg-green-500/10"
        : score >= 5
          ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
          : "text-red-400 border-red-500/30 bg-red-500/10"
      : "";

  return (
    <ToolLayout
      title="Rate My Portfolio / Resume"
      description="Get instant AI feedback on your portfolio or resume. Honest score, strengths, weaknesses, and actionable tips."
    >
      <div className="space-y-5">
        {/* Uses Counter */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Paste your portfolio or resume content
          </span>
          <span
            className={`text-sm font-medium ${
              usesLeft > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {usesLeft} free {usesLeft === 1 ? "review" : "reviews"} left today
          </span>
        </div>

        {/* Role & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Target Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer, UX Designer..."
              className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-white/5 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full p-3 border border-white/10 rounded-xl text-gray-100 bg-white/5 focus:ring-2 focus:ring-indigo-500/50 outline-none"
            >
              <option value="junior">Junior (0-2 years)</option>
              <option value="mid">Mid-level (2-5 years)</option>
              <option value="senior">Senior (5+ years)</option>
              <option value="lead">Lead / Manager</option>
              <option value="student">Student / Intern</option>
            </select>
          </div>
        </div>

        {/* Input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste your portfolio description, resume summary, project list, skills, bio — anything you want reviewed..."
          className="w-full h-52 p-4 border border-white/10 rounded-xl text-gray-100 bg-white/5 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/50 resize-none outline-none"
          maxLength={5000}
        />
        <div className="text-xs text-gray-500 text-right">
          {description.length}/5000 characters
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={analyze}
          disabled={!description.trim() || loading || usesLeft <= 0}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Analyzing your portfolio...
            </span>
          ) : (
            "Rate My Portfolio"
          )}
        </button>

        {/* Score */}
        {score !== null && (
          <div className="flex justify-center">
            <div
              className={`px-8 py-4 rounded-2xl border text-center ${scoreColor}`}
            >
              <div className="text-4xl font-bold">{score}/10</div>
              <div className="text-sm mt-1 opacity-80">Portfolio Score</div>
            </div>
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">
            {output}
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-white/5 rounded-xl p-4 text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-gray-400">Disclaimer</p>
          <p>
            This tool uses AI to provide general feedback on your portfolio or
            resume. It is not a substitute for professional career advice. The
            AI may not fully understand your industry, context, or specific
            situation. Results are for informational purposes only. We do not
            store or share any content you submit — all data is processed
            in real-time and discarded.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}

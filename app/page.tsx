import Link from "next/link";
import { tools } from "@/lib/tools-registry";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";

export default function Home() {
  const featured = ["deal-finder", "ai-humanizer", "rate-my-portfolio", "horoscope"];
  const otherTools = tools.filter((t) => !featured.includes(t.slug));

  return (
    <div className="hero-gradient">
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-indigo-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          15 free tools — no signup required
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Free Online Tools
          <br />
          <span className="gradient-text">That Just Work</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Fast, private, and powerful. Every tool runs entirely in your browser.
          No uploads. No signups. No limits. Ever.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            100% Private
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </span>
            Instant Results
          </span>
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
            Always Free
          </span>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="mx-auto max-w-6xl px-4 pb-10 space-y-4">
        <h2 className="text-xl font-semibold text-gray-300 mb-2">
          Featured
        </h2>

        {/* AI Text Humanizer */}
        <Link
          href="/ai-humanizer"
          className="block relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-blue-500/10 p-6 md:p-8 glow-hover group"
          style={{ boxShadow: "0 0 40px rgba(139, 92, 246, 0.08)" }}
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
            AI Powered
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="text-5xl">🤖</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                AI Text Humanizer
              </h3>
              <p className="text-gray-400 mb-3">
                Make AI-generated text sound natural and human-written. Works
                with ChatGPT, Claude, Gemini. Choose your tone.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">Bypass AI detection</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">4 tone options</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">3 free/day</span>
              </div>
            </div>
            <div className="text-indigo-400 group-hover:text-purple-400 transition-colors text-lg font-medium whitespace-nowrap">
              Try it free →
            </div>
          </div>
        </Link>

        {/* Rate My Portfolio */}
        <Link
          href="/rate-my-portfolio"
          className="block relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-6 md:p-8 glow-hover group"
          style={{ boxShadow: "0 0 40px rgba(16, 185, 129, 0.08)" }}
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            AI Powered
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="text-5xl">📊</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                Rate My Portfolio / Resume
              </h3>
              <p className="text-gray-400 mb-3">
                Get instant AI feedback on your portfolio or resume. Score out
                of 10, strengths, weaknesses, and actionable tips.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">Score out of 10</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">Actionable tips</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">2 free/day</span>
              </div>
            </div>
            <div className="text-indigo-400 group-hover:text-emerald-400 transition-colors text-lg font-medium whitespace-nowrap">
              Try it free →
            </div>
          </div>
        </Link>

        {/* Horoscope */}
        <Link
          href="/horoscope"
          className="block relative overflow-hidden rounded-2xl border border-violet-500/30 p-6 md:p-8 glow-hover group"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.05), rgba(236,72,153,0.08))",
            boxShadow: "0 0 40px rgba(124, 58, 237, 0.08)",
          }}
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
            Trending
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="text-5xl">🔮</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">
                Daily Horoscope & Astrology
              </h3>
              <p className="text-gray-400 mb-3">
                AI-powered daily horoscope, zodiac compatibility checker, and
                birth chart reading. Available in English, French & Spanish.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">12 zodiac signs</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">Love compatibility</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">3 languages</span>
              </div>
            </div>
            <div className="text-indigo-400 group-hover:text-violet-400 transition-colors text-lg font-medium whitespace-nowrap">
              Try it free →
            </div>
          </div>
        </Link>

        {/* Deal Finder */}
        <Link
          href="/deal-finder"
          className="block relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-orange-500/10 p-6 md:p-8 glow-hover group"
          style={{ boxShadow: "0 0 40px rgba(234, 179, 8, 0.08)" }}
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            Popular
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="text-5xl">💰</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                Smart Deal Finder
              </h3>
              <p className="text-gray-400 mb-3">
                Find cheaper alternatives for any product. Compare prices across
                Amazon, AliExpress, eBay, Walmart & more.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">AirPods Pro dupes</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">Dyson alternatives</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300">Save up to 80%</span>
              </div>
            </div>
            <div className="text-indigo-400 group-hover:text-yellow-400 transition-colors text-lg font-medium whitespace-nowrap">
              Try it free →
            </div>
          </div>
        </Link>
      </div>

      {/* Ad between featured and tools */}
      <div className="mx-auto max-w-6xl px-4">
        <AdSlot className="mb-8" />
      </div>

      {/* Tools Grid */}
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-xl font-semibold text-gray-300 mb-6">
          All Tools
        </h2>
        <div
          id="tools"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {otherTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {/* Ad after tools grid */}
        <AdSlot className="mt-8" />
      </div>
    </div>
  );
}

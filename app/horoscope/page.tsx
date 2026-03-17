"use client";

import { useState } from "react";
import { signs } from "@/lib/zodiac";
import { Locale, t, signNames } from "@/lib/i18n";

type Tab = "daily" | "compatibility" | "birthchart";

export default function HoroscopePage() {
  const [lang, setLang] = useState<Locale>("en");
  const [tab, setTab] = useState<Tab>("daily");
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [partnerSign, setPartnerSign] = useState<number | null>(null);
  const [birthday, setBirthday] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReading = async () => {
    if (tab === "daily" && selectedSign === null) return;
    if (tab === "compatibility" && (selectedSign === null || partnerSign === null)) return;
    if (tab === "birthchart" && !birthday) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const body: Record<string, string> = { type: tab, lang };
      if (tab === "daily") body.sign = signs[selectedSign!].name;
      if (tab === "compatibility") {
        body.sign = signs[selectedSign!].name;
        body.partnerSign = signs[partnerSign!].name;
      }
      if (tab === "birthchart") body.birthday = birthday;

      const res = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (e: unknown) {
      setError((e as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const names = signNames[lang];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Solar System Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Stars layers */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 50% 10%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.4), transparent),
            radial-gradient(2px 2px at 15% 85%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 45% 45%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 95% 30%, rgba(255,255,255,0.3), transparent),
            radial-gradient(2px 2px at 75% 90%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 35% 15%, rgba(255,255,255,0.5), transparent)
          `,
        }} />

        {/* Nebula glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7c3aed, #3b82f6, #ec4899, transparent)" }} />

        {/* === SOLAR SYSTEM - Orbiting Planets === */}
        <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] hidden md:block">
          {/* Sun */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
            style={{
              background: "radial-gradient(circle at 40% 40%, #fbbf24, #f59e0b, #d97706)",
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.4), 0 0 80px rgba(251, 191, 36, 0.15)",
            }} />

          {/* Mercury orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full border border-white/5"
            style={{ animation: "orbit 8s linear infinite" }}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
              style={{ background: "radial-gradient(circle at 35% 35%, #a3a3a3, #525252)" }} />
          </div>

          {/* Venus orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-white/5"
            style={{ animation: "orbit 12s linear infinite reverse" }}>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full"
              style={{ background: "radial-gradient(circle at 35% 35%, #fcd34d, #b45309)" }} />
          </div>

          {/* Earth orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[170px] rounded-full border border-white/5"
            style={{ animation: "orbit 18s linear infinite" }}>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8)",
                boxShadow: "0 0 8px rgba(96, 165, 250, 0.3)",
              }}>
              {/* Moon */}
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-gray-300"
                style={{ animation: "orbit 3s linear infinite" }} />
            </div>
          </div>

          {/* Mars orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-white/5"
            style={{ animation: "orbit 25s linear infinite" }}>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{ background: "radial-gradient(circle at 35% 35%, #ef4444, #991b1b)" }} />
          </div>

          {/* Jupiter orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] h-[290px] rounded-full border border-white/5"
            style={{ animation: "orbit 40s linear infinite reverse" }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #d4a574, #92400e)",
                boxShadow: "0 0 10px rgba(212, 165, 116, 0.2)",
              }}>
              {/* Jupiter band */}
              <div className="absolute top-[40%] left-0 w-full h-[2px] bg-amber-800/40 rounded-full" />
              <div className="absolute top-[55%] left-0 w-full h-[1px] bg-amber-700/30 rounded-full" />
            </div>
          </div>

          {/* Saturn orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-white/5"
            style={{ animation: "orbit 55s linear infinite" }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              {/* Saturn body */}
              <div className="w-6 h-6 rounded-full"
                style={{ background: "radial-gradient(circle at 35% 35%, #fbbf24, #92400e)" }} />
              {/* Saturn rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-3 rounded-full border border-amber-400/30 rotate-[25deg]" />
            </div>
          </div>
        </div>

        {/* Floating planets for mobile */}
        <div className="md:hidden">
          <div className="absolute top-16 right-4 w-8 h-8 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle at 35% 35%, #fbbf24, #92400e)", animation: "float 6s ease-in-out infinite" }} />
          <div className="absolute top-40 left-4 w-5 h-5 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle at 35% 35%, #60a5fa, #1d4ed8)", animation: "float 8s ease-in-out infinite 2s" }} />
          <div className="absolute bottom-40 right-8 w-6 h-6 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle at 35% 35%, #ef4444, #991b1b)", animation: "float 7s ease-in-out infinite 1s" }} />
        </div>

        {/* Shooting star */}
        <div className="absolute top-[20%] left-0 w-[100px] h-[1px] opacity-0"
          style={{
            background: "linear-gradient(90deg, transparent, white, transparent)",
            animation: "shootingStar 8s ease-in-out infinite 3s",
          }} />
        <div className="absolute top-[60%] right-0 w-[80px] h-[1px] opacity-0"
          style={{
            background: "linear-gradient(90deg, transparent, white, transparent)",
            animation: "shootingStar2 12s ease-in-out infinite 7s",
          }} />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shootingStar {
          0%, 95%, 100% { opacity: 0; transform: translate(0, 0) rotate(-35deg); }
          97% { opacity: 1; }
          98% { opacity: 0.8; transform: translate(300px, 150px) rotate(-35deg); }
        }
        @keyframes shootingStar2 {
          0%, 93%, 100% { opacity: 0; transform: translate(0, 0) rotate(210deg); }
          95% { opacity: 1; }
          96% { opacity: 0.6; transform: translate(-250px, 120px) rotate(210deg); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="text-5xl mb-3">🔮</div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {t(lang, "heroTitle")}
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                {t(lang, "heroTitleHighlight")}
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              {t(lang, "heroDescription")}
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
            {(["en", "fr", "es"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  lang === l
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {l === "en" ? "🇬🇧 English" : l === "fr" ? "🇫🇷 Francais" : "🇪🇸 Espanol"}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {([
            { key: "daily" as Tab, icon: "⭐", label: t(lang, "dailyHoroscope") },
            { key: "compatibility" as Tab, icon: "💕", label: t(lang, "compatibility") },
            { key: "birthchart" as Tab, icon: "🌙", label: t(lang, "birthChart") },
          ]).map((item) => (
            <button
              key={item.key}
              onClick={() => { setTab(item.key); setResult(""); setError(""); }}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === item.key
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Main Card */}
        <div className="glass rounded-2xl p-6 md:p-8" style={{ boxShadow: "0 0 60px rgba(124, 58, 237, 0.06)" }}>
          {/* Daily */}
          {tab === "daily" && (
            <div className="space-y-6">
              <p className="text-center text-gray-400">{t(lang, "selectSign")}</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {signs.map((sign, i) => (
                  <button
                    key={sign.name}
                    onClick={() => setSelectedSign(i)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedSign === i
                        ? "border-violet-500/50 bg-violet-500/20 shadow-lg shadow-violet-500/10"
                        : "border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5"
                    }`}
                  >
                    <div className="text-2xl mb-1">{sign.symbol}</div>
                    <div className="text-sm font-medium text-gray-200">{names[i]}</div>
                    <div className="text-xs text-gray-500">{sign.dates}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={fetchReading}
                disabled={selectedSign === null || loading}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 transition-all text-lg shadow-lg shadow-violet-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t(lang, "loading")}
                  </span>
                ) : t(lang, "getReading")}
              </button>
            </div>
          )}

          {/* Compatibility */}
          {tab === "compatibility" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-center text-gray-400 mb-3">{t(lang, "selectSign")}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {signs.map((sign, i) => (
                      <button
                        key={sign.name}
                        onClick={() => setSelectedSign(i)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          selectedSign === i
                            ? "border-pink-500/50 bg-pink-500/20"
                            : "border-white/10 hover:border-pink-500/30"
                        }`}
                      >
                        <span className="text-lg">{sign.symbol}</span>
                        <span className="text-xs text-gray-300 ml-1">{names[i]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-center text-gray-400 mb-3">{t(lang, "selectPartnerSign")}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {signs.map((sign, i) => (
                      <button
                        key={sign.name + "-partner"}
                        onClick={() => setPartnerSign(i)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          partnerSign === i
                            ? "border-pink-500/50 bg-pink-500/20"
                            : "border-white/10 hover:border-pink-500/30"
                        }`}
                      >
                        <span className="text-lg">{sign.symbol}</span>
                        <span className="text-xs text-gray-300 ml-1">{names[i]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {selectedSign !== null && partnerSign !== null && (
                <div className="text-center text-2xl text-white py-2">
                  {signs[selectedSign].symbol} {names[selectedSign]} 💕 {signs[partnerSign].symbol} {names[partnerSign]}
                </div>
              )}
              <button
                onClick={fetchReading}
                disabled={selectedSign === null || partnerSign === null || loading}
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 transition-all text-lg shadow-lg shadow-pink-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t(lang, "loading")}
                  </span>
                ) : t(lang, "checkCompatibility")}
              </button>
            </div>
          )}

          {/* Birth Chart */}
          {tab === "birthchart" && (
            <div className="space-y-6">
              <p className="text-center text-gray-400">{t(lang, "enterBirthday")}</p>
              <div className="max-w-xs mx-auto">
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-center text-lg focus:ring-2 focus:ring-violet-500/50 outline-none"
                />
              </div>
              <button
                onClick={fetchReading}
                disabled={!birthday || loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 transition-all text-lg shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t(lang, "loading")}
                  </span>
                ) : t(lang, "analyzeBirthChart")}
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 p-6 rounded-xl border border-violet-500/20" style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(59,130,246,0.05), rgba(236,72,153,0.03))",
            }}>
              <div
                className="text-gray-200 leading-relaxed space-y-3 [&_strong]:text-violet-300 [&_strong]:font-semibold [&_hr]:border-violet-500/20 [&_hr]:my-4"
                dangerouslySetInnerHTML={{
                  __html: result
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/^# (.+)$/gm, '<h2 class="text-xl font-bold text-violet-300 mb-2">$1</h2>')
                    .replace(/^---$/gm, "<hr>")
                    .replace(/\n\n/g, "<br><br>")
                    .replace(/\n/g, "<br>"),
                }}
              />
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          {t(lang, "disclaimer")}
        </p>
      </div>
    </div>
  );
}

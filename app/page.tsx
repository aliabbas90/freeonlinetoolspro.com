import { tools } from "@/lib/tools-registry";
import ToolCard from "@/components/ToolCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Free Online Tools
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fast, free, and private. All tools run entirely in your browser — no
          uploads, no signups, no limits.
        </p>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        <span>🔒 100% Private — No data uploaded</span>
        <span>⚡ Instant — Runs in your browser</span>
        <span>🆓 Free — No signup required</span>
      </div>
    </div>
  );
}

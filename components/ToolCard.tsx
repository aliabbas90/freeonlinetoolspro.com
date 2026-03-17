import Link from "next/link";
import { Tool } from "@/lib/tools-registry";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group glass rounded-2xl p-6 glow-hover block"
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
        {tool.icon}
      </div>
      <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors mb-1.5">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
      <div className="mt-4 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
        Use tool →
      </div>
    </Link>
  );
}

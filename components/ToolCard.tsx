import Link from "next/link";
import { Tool } from "@/lib/tools-registry";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
    >
      <div className="text-3xl mb-3">{tool.icon}</div>
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500">{tool.description}</p>
    </Link>
  );
}

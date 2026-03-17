import Link from "next/link";
import { tools } from "@/lib/tools-registry";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()}{" "}
            {process.env.NEXT_PUBLIC_SITE_NAME || "Free Online Tools Pro"}
          </div>
          <div className="text-sm text-gray-600">
            All tools run 100% in your browser. No data uploaded.
          </div>
        </div>
      </div>
    </footer>
  );
}

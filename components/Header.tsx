import Link from "next/link";
import { tools } from "@/lib/tools-registry";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          🛠️ {process.env.NEXT_PUBLIC_SITE_NAME || "AI ToolKit"}
        </Link>
        <nav className="hidden md:flex gap-4">
          {tools.slice(0, 4).map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
          <Link
            href="/#tools"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            All Tools →
          </Link>
        </nav>
      </div>
    </header>
  );
}

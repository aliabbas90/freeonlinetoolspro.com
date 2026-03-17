import Link from "next/link";
import { tools } from "@/lib/tools-registry";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          {process.env.NEXT_PUBLIC_SITE_NAME || "AI ToolKit"}. All tools are
          free and run entirely in your browser.
        </div>
      </div>
    </footer>
  );
}

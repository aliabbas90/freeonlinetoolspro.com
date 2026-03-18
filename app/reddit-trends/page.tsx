"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

interface Post {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  score: number;
  num_comments: number;
  url: string;
  permalink: string;
  thumbnail: string | null;
  created_utc: number;
  selftext: string;
  link_flair_text: string | null;
}

const CATEGORIES = [
  { key: "hot", label: "Hot" },
  { key: "tech", label: "Tech" },
  { key: "news", label: "News" },
  { key: "funny", label: "Funny" },
  { key: "science", label: "Science" },
  { key: "gaming", label: "Gaming" },
  { key: "business", label: "Business" },
  { key: "finance", label: "Finance" },
  { key: "askreddit", label: "AskReddit" },
];

const CATEGORY_ICONS: Record<string, string> = {
  hot: "🔥", tech: "💻", news: "📰", funny: "😂",
  science: "🔬", gaming: "🎮", business: "💼",
  finance: "📈", askreddit: "❓",
};

const TIME_FILTERS = [
  { key: "hour", label: "Now" },
  { key: "day", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
  { key: "all", label: "All Time" },
];

function timeAgo(utc: number): string {
  const seconds = Math.floor(Date.now() / 1000 - utc);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function RedditTrends() {
  const [category, setCategory] = useState("hot");
  const [time, setTime] = useState("day");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/reddit?category=${category}&time=${time}`)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [category, time]);

  return (
    <ToolLayout
      title="Reddit Trending"
      description="See what's trending on Reddit right now. Top posts across categories, updated in real-time."
    >
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === cat.key
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {CATEGORY_ICONS[cat.key]} {cat.label}
          </button>
        ))}
      </div>

      {/* Time filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TIME_FILTERS.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setTime(tf.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              time === tf.key
                ? "bg-white/15 text-white"
                : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          No posts found. Try a different category or time range.
        </p>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 transition-all p-4 group"
            >
              <div className="flex gap-4">
                {/* Rank & Score */}
                <div className="flex flex-col items-center gap-1 min-w-[3rem] text-center">
                  <span className="text-xs text-gray-600">#{i + 1}</span>
                  <span className="text-lg font-bold text-indigo-400">
                    {formatNumber(post.score)}
                  </span>
                  <svg
                    className="w-4 h-4 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-medium text-indigo-400">
                      r/{post.subreddit}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-600">
                      u/{post.author}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-600">
                      {timeAgo(post.created_utc)}
                    </span>
                    {post.link_flair_text && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                        {post.link_flair_text}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors leading-snug mb-1">
                    {post.title}
                  </h3>

                  {post.selftext && (
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {post.selftext}
                      {post.selftext.length >= 200 ? "..." : ""}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      {formatNumber(post.num_comments)} comments
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 font-medium">
                      Open on Reddit →
                    </span>
                  </div>
                </div>

                {/* Thumbnail */}
                {post.thumbnail && (
                  <div className="hidden sm:block flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.thumbnail}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-lg object-cover bg-white/5"
                    />
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}

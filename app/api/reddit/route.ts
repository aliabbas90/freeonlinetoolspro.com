import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CATEGORIES: Record<string, string[]> = {
  hot: ["all"],
  tech: ["technology", "programming", "webdev", "gadgets"],
  news: ["worldnews", "news", "UpliftingNews"],
  funny: ["funny", "memes", "dankmemes"],
  science: ["science", "space", "Futurology"],
  gaming: ["gaming", "pcgaming", "Games"],
  business: ["business", "entrepreneur", "startups"],
  finance: ["wallstreetbets", "investing", "personalfinance", "CryptoCurrency"],
  askreddit: ["AskReddit"],
};

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category") || "hot";
  const time = req.nextUrl.searchParams.get("time") || "day";

  const subs = CATEGORIES[category] || CATEGORIES.hot;

  try {
    const results = await Promise.all(
      subs.map(async (sub) => {
        const res = await fetch(
          `https://www.reddit.com/r/${sub}/top.json?t=${time}&limit=10`,
          {
            headers: { "User-Agent": "Toolbox/1.0" },
            cache: "no-store",
          }
        );
        if (!res.ok) return [];
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data?.data?.children || []).map((child: any) => ({
          id: child.data.id,
          title: child.data.title,
          subreddit: child.data.subreddit,
          author: child.data.author,
          score: child.data.score,
          num_comments: child.data.num_comments,
          url: child.data.url,
          permalink: `https://reddit.com${child.data.permalink}`,
          thumbnail:
            child.data.thumbnail?.startsWith("http")
              ? child.data.thumbnail
              : null,
          created_utc: child.data.created_utc,
          is_video: child.data.is_video,
          selftext:
            child.data.selftext?.substring(0, 200) || "",
          link_flair_text: child.data.link_flair_text,
        }));
      })
    );

    // Flatten, deduplicate, sort by score
    const seen = new Set<string>();
    const posts = results
      .flat()
      .filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [], error: "Failed to fetch" }, { status: 500 });
  }
}

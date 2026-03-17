"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const TOPIC_HASHTAGS: Record<string, string[]> = {
  fitness: ["#fitness", "#fitfam", "#workout", "#gym", "#fitnessmotivation", "#bodybuilding", "#training", "#health", "#fit", "#exercise", "#healthylifestyle", "#muscle", "#gymlife", "#crossfit", "#personaltrainer", "#sport", "#fitnessjourney", "#gains", "#strength", "#fitlife", "#cardio", "#weightlifting", "#legday", "#gymmotivation", "#fitnessaddict", "#getfit", "#fitspo", "#workoutmotivation", "#strongnotskinny", "#fitnessgoals"],
  food: ["#food", "#foodie", "#foodporn", "#instafood", "#yummy", "#delicious", "#foodphotography", "#foodstagram", "#homemade", "#cooking", "#foodblogger", "#healthyfood", "#dinner", "#lunch", "#breakfast", "#chef", "#recipe", "#tasty", "#foodlover", "#eat", "#homecooking", "#baking", "#restaurant", "#vegan", "#organic", "#mealprep", "#eathealthy", "#foodgasm", "#nomnom", "#brunch"],
  travel: ["#travel", "#travelgram", "#traveling", "#wanderlust", "#instatravel", "#travelphotography", "#traveltheworld", "#explore", "#adventure", "#vacation", "#tourism", "#travelblogger", "#trip", "#holiday", "#backpacking", "#roadtrip", "#passport", "#beach", "#nature", "#landscape", "#traveler", "#traveladdict", "#bucketlist", "#paradise", "#getaway", "#solotravel", "#wanderer", "#globetrotter", "#exploremore", "#travellife"],
  fashion: ["#fashion", "#style", "#ootd", "#fashionblogger", "#instafashion", "#fashionista", "#streetstyle", "#outfit", "#clothing", "#trendy", "#fashionstyle", "#lookoftheday", "#stylish", "#fashionable", "#whatiwore", "#streetwear", "#designer", "#brand", "#model", "#shopping", "#shoes", "#accessories", "#luxury", "#chic", "#vintage", "#mensfashion", "#womensfashion", "#styleinspo", "#fashionweek", "#outfitoftheday"],
  tech: ["#tech", "#technology", "#programming", "#coding", "#developer", "#software", "#webdev", "#startup", "#ai", "#innovation", "#machinelearning", "#datascience", "#javascript", "#python", "#computerscience", "#gadgets", "#digital", "#cybersecurity", "#cloud", "#devops", "#frontend", "#backend", "#techlife", "#code", "#opensource", "#reactjs", "#webdesign", "#appdev", "#techcommunity", "#futuretech"],
  photography: ["#photography", "#photooftheday", "#photo", "#photographer", "#naturephotography", "#portraitphotography", "#streetphotography", "#landscape", "#canon", "#nikon", "#sony", "#lightroom", "#photoshoot", "#camera", "#instaphoto", "#picoftheday", "#shotoniphone", "#goldenhour", "#composition", "#visualart", "#creativephotography", "#photographylovers", "#photographyislife", "#travelphotography", "#urbanphotography", "#sunset", "#blackandwhite", "#macro", "#wildlife", "#filmmaking"],
  music: ["#music", "#musician", "#singer", "#song", "#rap", "#hiphop", "#rock", "#pop", "#guitar", "#piano", "#producer", "#beats", "#songwriter", "#newmusic", "#livemusic", "#concert", "#spotify", "#soundcloud", "#indie", "#dj", "#edm", "#electronic", "#vinyl", "#musicproducer", "#studio", "#band", "#artist", "#musiclover", "#musiclife", "#mixtape"],
  art: ["#art", "#artist", "#artwork", "#drawing", "#painting", "#illustration", "#digitalart", "#sketch", "#design", "#creative", "#contemporaryart", "#abstractart", "#artistsoninstagram", "#artoftheday", "#fineart", "#watercolor", "#acrylic", "#oilpainting", "#portrait", "#sculpture", "#graphicdesign", "#artgallery", "#instaart", "#artlife", "#artistlife", "#handmade", "#creativity", "#modernart", "#streetart", "#fanart"],
  beauty: ["#beauty", "#makeup", "#skincare", "#cosmetics", "#beautyblogger", "#makeupartist", "#mua", "#lips", "#eyes", "#foundation", "#lipstick", "#eyeshadow", "#beautytips", "#skincareroutine", "#glam", "#beautiful", "#glow", "#selfcare", "#nails", "#hairstyle", "#haircare", "#naturalskincare", "#beautyproducts", "#instamakeup", "#makeuplover", "#beautycommunity", "#skincareaddict", "#makeuptutorial", "#beautyhacks", "#cleanbeauty"],
  nature: ["#nature", "#naturephotography", "#landscape", "#wildlife", "#outdoors", "#hiking", "#mountains", "#forest", "#ocean", "#sunset", "#sunrise", "#earth", "#naturelover", "#adventure", "#explore", "#camping", "#river", "#lake", "#flowers", "#trees", "#sky", "#clouds", "#nationalpark", "#wilderness", "#earthpix", "#naturelovers", "#beautifulnature", "#mothernature", "#getoutside", "#wild"],
  business: ["#business", "#entrepreneur", "#marketing", "#success", "#startup", "#money", "#motivation", "#leadership", "#branding", "#smallbusiness", "#hustle", "#goals", "#investment", "#finance", "#ceo", "#networking", "#digitalmarketing", "#socialmedia", "#growth", "#mindset", "#sales", "#strategy", "#wealth", "#ecommerce", "#productivity", "#freelance", "#businessowner", "#innovation", "#passive income", "#sidehustle"],
  motivation: ["#motivation", "#inspiration", "#mindset", "#success", "#goals", "#motivationalquotes", "#positivevibes", "#nevergiveup", "#believe", "#grind", "#hustle", "#selflove", "#growth", "#determination", "#ambition", "#focus", "#discipline", "#selfimprovement", "#positivity", "#dream", "#hardwork", "#lifestyle", "#mindfulness", "#gratitude", "#personaldevelopment", "#mentalhealth", "#strength", "#confidence", "#keepgoing", "#dailymotivation"],
};

function generateHashtags(topic: string): string[] {
  const lower = topic.toLowerCase().trim();

  // Check for direct match
  if (TOPIC_HASHTAGS[lower]) return TOPIC_HASHTAGS[lower];

  // Check if topic contains a known keyword
  for (const [key, tags] of Object.entries(TOPIC_HASHTAGS)) {
    if (lower.includes(key) || key.includes(lower)) {
      return tags;
    }
  }

  // Generate generic hashtags for unknown topics
  const clean = lower.replace(/[^a-z0-9]/g, "");
  if (!clean) return [];

  return [
    `#${clean}`,
    `#${clean}life`,
    `#${clean}vibes`,
    `#${clean}oftheday`,
    `#${clean}lovers`,
    `#insta${clean}`,
    `#${clean}gram`,
    `#${clean}daily`,
    `#${clean}world`,
    `#${clean}community`,
    `#${clean}style`,
    `#${clean}love`,
    `#${clean}photography`,
    `#${clean}inspiration`,
    `#${clean}goals`,
    `#${clean}mood`,
    `#${clean}time`,
    `#${clean}culture`,
    `#${clean}blog`,
    `#${clean}tips`,
    `#${clean}addict`,
    `#${clean}forever`,
    `#${clean}matters`,
    `#${clean}passion`,
    `#${clean}enthusiast`,
    `#love${clean}`,
    `#my${clean}`,
    `#best${clean}`,
    `#the${clean}`,
    `#${clean}is life`,
  ].slice(0, 30);
}

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setHashtags(generateHashtags(topic));
    setCopiedAll(false);
    setCopiedTag(null);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  return (
    <ToolLayout
      title="Hashtag Generator"
      description="Generate trending hashtags for Instagram, TikTok, and Twitter."
    >
      <div className="space-y-6">
        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter a topic (e.g. fitness, food, travel...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            className="flex-1 px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors shrink-0"
          >
            Generate
          </button>
        </div>

        {/* Results */}
        {hashtags.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{hashtags.length} hashtags generated</span>
              <button
                onClick={copyAll}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors"
              >
                {copiedAll ? "Copied All!" : "Copy All"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => copyTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    copiedTag === tag
                      ? "bg-green-600/20 text-green-400 border border-green-500/30"
                      : "bg-white/5 text-indigo-300 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {copiedTag === tag ? "Copied!" : tag}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}

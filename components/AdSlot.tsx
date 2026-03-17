"use client";

import { useEffect, useRef } from "react";

export default function AdSlot({ className = "" }: { className?: string }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsenseId || pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, [adsenseId]);

  if (!adsenseId) {
    // Show placeholder in dev so you can see ad placement
    return (
      <div className={`${className}`}>
        <div className="w-full py-6 px-4 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center">
          <span className="text-xs text-gray-600">Ad Space — Visible on live site</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function AdSlot({ className = "" }: { className?: string }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      setIsLocal(true);
      return;
    }
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

  if (isLocal) {
    return (
      <div className={`${className}`}>
        <div className="w-full py-8 px-4 rounded-xl border-2 border-dashed border-violet-500/20 bg-violet-500/5 flex flex-col items-center justify-center gap-1">
          <span className="text-sm text-violet-400 font-medium">AD SPACE</span>
          <span className="text-xs text-gray-500">Google AdSense — visible on live site</span>
        </div>
      </div>
    );
  }

  if (!adsenseId) return null;

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

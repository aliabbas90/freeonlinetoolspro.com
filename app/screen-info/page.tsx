"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

interface ScreenData {
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  devicePixelRatio: number;
  colorDepth: number;
  browser: string;
  platform: string;
  language: string;
  online: boolean;
  touchSupport: boolean;
  cookiesEnabled: boolean;
}

function detectBrowser(ua: string): string {
  if (ua.includes("Firefox/")) {
    const match = ua.match(/Firefox\/([\d.]+)/);
    return `Firefox ${match ? match[1] : ""}`;
  }
  if (ua.includes("Edg/")) {
    const match = ua.match(/Edg\/([\d.]+)/);
    return `Edge ${match ? match[1] : ""}`;
  }
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    const match = ua.match(/Chrome\/([\d.]+)/);
    return `Chrome ${match ? match[1] : ""}`;
  }
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
    const match = ua.match(/Version\/([\d.]+)/);
    return `Safari ${match ? match[1] : ""}`;
  }
  return ua;
}

export default function ScreenInfoPage() {
  const [data, setData] = useState<ScreenData | null>(null);

  const gather = () => {
    setData({
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      colorDepth: window.screen.colorDepth,
      browser: detectBrowser(navigator.userAgent),
      platform: navigator.platform,
      language: navigator.language,
      online: navigator.onLine,
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      cookiesEnabled: navigator.cookieEnabled,
    });
  };

  useEffect(() => {
    gather();
    window.addEventListener("resize", gather);
    window.addEventListener("online", gather);
    window.addEventListener("offline", gather);
    return () => {
      window.removeEventListener("resize", gather);
      window.removeEventListener("online", gather);
      window.removeEventListener("offline", gather);
    };
  }, []);

  const InfoCard = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | boolean;
  }) => (
    <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
      <span className="text-gray-500 text-xs block mb-1">{label}</span>
      <span className="text-gray-100 font-mono text-lg font-semibold">
        {typeof value === "boolean" ? (
          <span className={value ? "text-green-400" : "text-red-400"}>
            {value ? "Yes" : "No"}
          </span>
        ) : (
          value
        )}
      </span>
    </div>
  );

  if (!data) {
    return (
      <ToolLayout
        title="Screen Info"
        description="Check your screen resolution, browser info, device pixel ratio, and more."
      >
        <div className="text-center text-gray-400 py-10">Loading...</div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      title="Screen Info"
      description="Check your screen resolution, browser info, device pixel ratio, and more."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          label="Screen Resolution"
          value={`${data.screenWidth} x ${data.screenHeight}`}
        />
        <InfoCard
          label="Viewport Size"
          value={`${data.viewportWidth} x ${data.viewportHeight}`}
        />
        <InfoCard label="Device Pixel Ratio" value={data.devicePixelRatio} />
        <InfoCard label="Color Depth" value={`${data.colorDepth}-bit`} />
        <InfoCard label="Browser" value={data.browser} />
        <InfoCard label="Platform / OS" value={data.platform} />
        <InfoCard label="Language" value={data.language} />
        <InfoCard label="Online Status" value={data.online} />
        <InfoCard label="Touch Support" value={data.touchSupport} />
        <InfoCard label="Cookies Enabled" value={data.cookiesEnabled} />
      </div>
    </ToolLayout>
  );
}

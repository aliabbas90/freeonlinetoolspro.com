"use client";

import { ReactNode } from "react";
import AdSlot from "./AdSlot";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          {title}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="glass rounded-2xl p-6 md:p-8">{children}</div>
      <AdSlot className="mt-8" />
    </div>
  );
}

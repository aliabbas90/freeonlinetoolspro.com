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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {children}
      </div>
      <AdSlot className="mt-8" />
    </div>
  );
}

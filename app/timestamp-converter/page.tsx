"use client";

import { useState, useEffect, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function TimestampConverterPage() {
  const [currentTimestamp, setCurrentTimestamp] = useState(
    Math.floor(Date.now() / 1000)
  );
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [fromTimestamp, setFromTimestamp] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copy = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  }, []);

  const convertTimestamp = () => {
    const ts = parseInt(timestampInput, 10);
    if (isNaN(ts)) return;
    // Handle seconds vs milliseconds
    const ms = ts > 1e12 ? ts : ts * 1000;
    setFromTimestamp(new Date(ms));
  };

  const convertDate = () => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return;
    setFromDate(Math.floor(d.getTime() / 1000));
  };

  const getRelativeTime = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const absDiff = Math.abs(diff);
    const isFuture = diff < 0;

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let label = "";
    if (years > 0) label = `${years} year${years > 1 ? "s" : ""}`;
    else if (months > 0) label = `${months} month${months > 1 ? "s" : ""}`;
    else if (days > 0) label = `${days} day${days > 1 ? "s" : ""}`;
    else if (hours > 0) label = `${hours} hour${hours > 1 ? "s" : ""}`;
    else if (minutes > 0) label = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    else label = `${seconds} second${seconds !== 1 ? "s" : ""}`;

    return isFuture ? `in ${label}` : `${label} ago`;
  };

  const CopyButton = ({
    text,
    field,
  }: {
    text: string;
    field: string;
  }) => (
    <button
      onClick={() => copy(text, field)}
      className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded transition-colors shrink-0"
    >
      {copiedField === field ? "Copied!" : "Copy"}
    </button>
  );

  const ResultRow = ({
    label,
    value,
    field,
  }: {
    label: string;
    value: string;
    field: string;
  }) => (
    <div className="flex items-center justify-between bg-gray-900 border border-white/10 rounded-lg p-3">
      <div>
        <span className="text-gray-500 text-xs block">{label}</span>
        <span className="text-gray-100 font-mono text-sm">{value}</span>
      </div>
      <CopyButton text={value} field={field} />
    </div>
  );

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates and back. Get the current timestamp."
    >
      <div className="space-y-8">
        {/* Current timestamp */}
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Unix Timestamp
          </label>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-mono font-bold text-indigo-400">
              {currentTimestamp}
            </span>
            <button
              onClick={() =>
                copy(currentTimestamp.toString(), "current")
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              {copiedField === "current" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Timestamp to date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Timestamp to Date
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="Enter Unix timestamp (e.g. 1700000000)"
              className="flex-1 bg-gray-900 border border-white/10 rounded-lg p-3 text-gray-100 outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={convertTimestamp}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
            >
              Convert
            </button>
          </div>
          {fromTimestamp && (
            <div className="mt-4 space-y-2">
              <ResultRow
                label="UTC"
                value={fromTimestamp.toUTCString()}
                field="ts-utc"
              />
              <ResultRow
                label="Local"
                value={fromTimestamp.toLocaleString()}
                field="ts-local"
              />
              <ResultRow
                label="ISO 8601"
                value={fromTimestamp.toISOString()}
                field="ts-iso"
              />
              <ResultRow
                label="Relative"
                value={getRelativeTime(fromTimestamp)}
                field="ts-rel"
              />
            </div>
          )}
        </div>

        <hr className="border-white/10" />

        {/* Date to timestamp */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date to Timestamp
          </label>
          <div className="flex gap-3">
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="flex-1 bg-gray-900 border border-white/10 rounded-lg p-3 text-gray-100 outline-none focus:border-indigo-500"
            />
            <button
              onClick={convertDate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
            >
              Convert
            </button>
          </div>
          {fromDate !== null && (
            <div className="mt-4 space-y-2">
              <ResultRow
                label="Unix Timestamp (seconds)"
                value={fromDate.toString()}
                field="dt-sec"
              />
              <ResultRow
                label="Unix Timestamp (milliseconds)"
                value={(fromDate * 1000).toString()}
                field="dt-ms"
              />
              <ResultRow
                label="ISO 8601"
                value={new Date(fromDate * 1000).toISOString()}
                field="dt-iso"
              />
              <ResultRow
                label="Relative"
                value={getRelativeTime(new Date(fromDate * 1000))}
                field="dt-rel"
              />
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

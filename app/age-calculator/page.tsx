"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";

const ZODIAC_SIGNS = [
  { sign: "Capricorn", start: [1, 1], end: [1, 19] },
  { sign: "Aquarius", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", start: [2, 19], end: [3, 20] },
  { sign: "Aries", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", start: [6, 21], end: [7, 22] },
  { sign: "Leo", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", start: [8, 23], end: [9, 22] },
  { sign: "Libra", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  { sign: "Capricorn", start: [12, 22], end: [12, 31] },
];

function getZodiac(month: number, day: number): string {
  for (const z of ZODIAC_SIGNS) {
    const afterStart = month > z.start[0] || (month === z.start[0] && day >= z.start[1]);
    const beforeEnd = month < z.end[0] || (month === z.end[0] && day <= z.end[1]);
    if (afterStart && beforeEnd) return z.sign;
  }
  return "Capricorn";
}

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
  dayOfBirth: string;
  zodiac: string;
  nextBirthdayDays: number;
}

function calculateAge(birthday: Date): AgeResult {
  const now = new Date();
  const birth = new Date(birthday);

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const totalMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfBirth = dayNames[birth.getDay()];

  const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

  // Next birthday
  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= now) {
    nextBirthday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return { years, months, days, hours, minutes, totalDays, dayOfBirth, zodiac, nextBirthdayDays };
}

export default function AgeCalculatorPage() {
  const [birthday, setBirthday] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

  useEffect(() => {
    if (!birthday) {
      setResult(null);
      return;
    }
    const date = new Date(birthday + "T00:00:00");
    if (isNaN(date.getTime()) || date > new Date()) {
      setResult(null);
      return;
    }
    setResult(calculateAge(date));

    const interval = setInterval(() => {
      setResult(calculateAge(date));
    }, 60000);
    return () => clearInterval(interval);
  }, [birthday]);

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, hours, and minutes."
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Enter your birthday</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {result && (
          <>
            {/* Main age display */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { label: "Years", value: result.years },
                { label: "Months", value: result.months },
                { label: "Days", value: result.days },
                { label: "Hours", value: result.hours },
                { label: "Minutes", value: result.minutes },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-400">{item.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Extra info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Total Days Lived</div>
                <div className="text-xl font-semibold text-gray-100">{result.totalDays.toLocaleString()}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Born On</div>
                <div className="text-xl font-semibold text-gray-100">{result.dayOfBirth}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Zodiac Sign</div>
                <div className="text-xl font-semibold text-gray-100">{result.zodiac}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Next Birthday In</div>
                <div className="text-xl font-semibold text-gray-100">
                  {result.nextBirthdayDays === 0 ? "Today!" : `${result.nextBirthdayDays} day${result.nextBirthdayDays !== 1 ? "s" : ""}`}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}

"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";

interface UnitDef {
  label: string;
  value: string;
}

interface CategoryDef {
  label: string;
  units: UnitDef[];
  convert: (value: number, from: string, to: string) => number;
}

// Conversion to base unit (meters for length, grams for weight, etc.)
const toBase: Record<string, Record<string, number>> = {
  Length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  Weight: { mg: 0.001, g: 1, kg: 1000, lb: 453.592, oz: 28.3495 },
  Speed: { "m/s": 1, "km/h": 1 / 3.6, mph: 0.44704, knots: 0.514444 },
  Data: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 },
};

function linearConvert(category: string, value: number, from: string, to: string): number {
  const factors = toBase[category];
  return (value * factors[from]) / factors[to];
}

function tempConvert(value: number, from: string, to: string): number {
  // Convert to Celsius first
  let celsius: number;
  if (from === "C") celsius = value;
  else if (from === "F") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15; // K

  // Convert from Celsius to target
  if (to === "C") return celsius;
  if (to === "F") return celsius * (9 / 5) + 32;
  return celsius + 273.15; // K
}

const CATEGORIES: Record<string, CategoryDef> = {
  Length: {
    label: "Length",
    units: [
      { label: "Millimeters (mm)", value: "mm" },
      { label: "Centimeters (cm)", value: "cm" },
      { label: "Meters (m)", value: "m" },
      { label: "Kilometers (km)", value: "km" },
      { label: "Inches (in)", value: "in" },
      { label: "Feet (ft)", value: "ft" },
      { label: "Yards (yd)", value: "yd" },
      { label: "Miles (mi)", value: "mi" },
    ],
    convert: (v, f, t) => linearConvert("Length", v, f, t),
  },
  Weight: {
    label: "Weight",
    units: [
      { label: "Milligrams (mg)", value: "mg" },
      { label: "Grams (g)", value: "g" },
      { label: "Kilograms (kg)", value: "kg" },
      { label: "Pounds (lb)", value: "lb" },
      { label: "Ounces (oz)", value: "oz" },
    ],
    convert: (v, f, t) => linearConvert("Weight", v, f, t),
  },
  Temperature: {
    label: "Temperature",
    units: [
      { label: "Celsius (C)", value: "C" },
      { label: "Fahrenheit (F)", value: "F" },
      { label: "Kelvin (K)", value: "K" },
    ],
    convert: tempConvert,
  },
  Speed: {
    label: "Speed",
    units: [
      { label: "Meters/sec (m/s)", value: "m/s" },
      { label: "Kilometers/hr (km/h)", value: "km/h" },
      { label: "Miles/hr (mph)", value: "mph" },
      { label: "Knots", value: "knots" },
    ],
    convert: (v, f, t) => linearConvert("Speed", v, f, t),
  },
  Data: {
    label: "Data",
    units: [
      { label: "Bytes (B)", value: "B" },
      { label: "Kilobytes (KB)", value: "KB" },
      { label: "Megabytes (MB)", value: "MB" },
      { label: "Gigabytes (GB)", value: "GB" },
      { label: "Terabytes (TB)", value: "TB" },
    ],
    convert: (v, f, t) => linearConvert("Data", v, f, t),
  },
};

const CATEGORY_KEYS = Object.keys(CATEGORIES);

export default function UnitConverterPage() {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState(CATEGORIES.Length.units[2].value); // m
  const [toUnit, setToUnit] = useState(CATEGORIES.Length.units[3].value); // km
  const [inputValue, setInputValue] = useState("1");

  const cat = CATEGORIES[category];

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const units = CATEGORIES[newCat].units;
    setFromUnit(units[0].value);
    setToUnit(units.length > 1 ? units[1].value : units[0].value);
    setInputValue("1");
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return "";
    const converted = cat.convert(num, fromUnit, toUnit);
    // Format smartly
    if (Math.abs(converted) < 0.000001 && converted !== 0) return converted.toExponential(6);
    if (Math.abs(converted) > 999999999) return converted.toExponential(6);
    // Use up to 10 significant digits
    const formatted = parseFloat(converted.toPrecision(10));
    return formatted.toLocaleString("en-US", { maximumFractionDigits: 10 });
  }, [inputValue, fromUnit, toUnit, cat]);

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert units: length, weight, temperature, speed, data, and more."
    >
      <div className="space-y-6">
        {/* Category selector */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === key
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              }`}
            >
              {CATEGORIES[key].label}
            </button>
          ))}
        </div>

        {/* Conversion row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {cat.units.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter value"
            />
          </div>

          {/* Swap button */}
          <div className="flex justify-center pb-2">
            <button
              onClick={swapUnits}
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-gray-200"
              title="Swap units"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16l-4-4 4-4" /><path d="M17 8l4 4-4 4" /><path d="M3 12h18" />
              </svg>
            </button>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {cat.units.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
            <div className="w-full px-4 py-3 bg-gray-900 border border-white/10 rounded-lg text-lg text-indigo-400 font-semibold min-h-[52px] flex items-center">
              {result || "—"}
            </div>
          </div>
        </div>

        {/* Formula display */}
        {inputValue && result && (
          <div className="text-center text-sm text-gray-400 bg-white/5 rounded-lg p-3">
            {inputValue} {fromUnit} = {result} {toUnit}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

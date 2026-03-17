"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const bill = parseFloat(billAmount) || 0;
  const tipAmount = bill * (tipPercent / 100);
  const totalWithTip = bill + tipAmount;
  const perPerson = people > 0 ? totalWithTip / people : 0;

  const formatCurrency = (value: number) =>
    `$${value.toFixed(2)}`;

  return (
    <ToolLayout
      title="Tip Calculator"
      description="Calculate tips and split bills easily. Perfect for restaurants and group dining."
    >
      <div className="space-y-8">
        {/* Bill amount */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bill Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-mono">
              $
            </span>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full bg-gray-900 border border-white/10 rounded-lg p-3 pl-8 text-gray-100 outline-none focus:border-indigo-500 font-mono text-lg"
            />
          </div>
        </div>

        {/* Tip percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tip Percentage:{" "}
            <span className="text-indigo-400 font-bold">{tipPercent}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
          </div>
          {/* Presets */}
          <div className="flex gap-2 mt-3">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setTipPercent(p)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tipPercent === p
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-900 border border-white/10 text-gray-300 hover:border-indigo-500"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>

        {/* Number of people */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of People
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPeople(Math.max(1, people - 1))}
              className="bg-gray-900 border border-white/10 text-gray-100 w-10 h-10 rounded-lg text-lg font-bold hover:border-indigo-500 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={people}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v >= 1 && v <= 20) setPeople(v);
              }}
              min="1"
              max="20"
              className="w-20 bg-gray-900 border border-white/10 rounded-lg p-2 text-gray-100 text-center outline-none focus:border-indigo-500 font-mono text-lg"
            />
            <button
              onClick={() => setPeople(Math.min(20, people + 1))}
              className="bg-gray-900 border border-white/10 text-gray-100 w-10 h-10 rounded-lg text-lg font-bold hover:border-indigo-500 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5 text-center">
            <span className="text-gray-500 text-xs block mb-1">Tip Amount</span>
            <span className="text-2xl font-bold font-mono text-gray-100">
              {formatCurrency(tipAmount)}
            </span>
          </div>
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5 text-center">
            <span className="text-gray-500 text-xs block mb-1">
              Total with Tip
            </span>
            <span className="text-2xl font-bold font-mono text-gray-100">
              {formatCurrency(totalWithTip)}
            </span>
          </div>
          <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-5 text-center">
            <span className="text-indigo-300 text-xs block mb-1">
              Per Person
            </span>
            <span className="text-2xl font-bold font-mono text-indigo-400">
              {formatCurrency(perPerson)}
            </span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

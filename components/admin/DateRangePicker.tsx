"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

const PRESET_RANGES = [
  "Aug 20, 2026 – Aug 26, 2026",
  "Last 7 Days",
  "Last 30 Days",
  "This Month (Aug 2026)",
  "Year to Date (2026)"
];

export function DateRangePicker() {
  const [selectedRange, setSelectedRange] = useState(PRESET_RANGES[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50/80 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <Calendar size={16} className="text-gray-400" />
        <span>{selectedRange}</span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
            {PRESET_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => {
                  setSelectedRange(range);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                  selectedRange === range
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{range}</span>
                {selectedRange === range && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

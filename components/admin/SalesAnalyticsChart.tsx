"use client";

import { useState } from "react";

type TimeRange = "Today" | "Week" | "Month" | "Year";

interface ChartPoint {
  label: string;
  value: number; // 0 to 1000 representing k
  displayValue: string;
}

const DATA_BY_RANGE: Record<TimeRange, { points: ChartPoint[]; peak: string; peakLabel: string }> = {
  Today: {
    peak: "₦780,000",
    peakLabel: "6PM",
    points: [
      { label: "8AM", value: 120, displayValue: "₦120,000" },
      { label: "10AM", value: 240, displayValue: "₦240,000" },
      { label: "12PM", value: 210, displayValue: "₦210,000" },
      { label: "2PM", value: 460, displayValue: "₦460,000" },
      { label: "4PM", value: 420, displayValue: "₦420,000" },
      { label: "6PM", value: 780, displayValue: "₦780,000" },
      { label: "8PM", value: 510, displayValue: "₦510,000" },
      { label: "10PM", value: 430, displayValue: "₦430,000" },
    ]
  },
  Week: {
    peak: "₦1,250,000",
    peakLabel: "Fri",
    points: [
      { label: "Mon", value: 380, displayValue: "₦380,000" },
      { label: "Tue", value: 520, displayValue: "₦520,000" },
      { label: "Wed", value: 490, displayValue: "₦490,000" },
      { label: "Thu", value: 710, displayValue: "₦710,000" },
      { label: "Fri", value: 920, displayValue: "₦1,250,000" },
      { label: "Sat", value: 840, displayValue: "₦840,000" },
      { label: "Sun", value: 620, displayValue: "₦620,000" },
    ]
  },
  Month: {
    peak: "₦4,800,000",
    peakLabel: "Week 3",
    points: [
      { label: "Week 1", value: 420, displayValue: "₦2,100,000" },
      { label: "Week 2", value: 640, displayValue: "₦3,200,000" },
      { label: "Week 3", value: 880, displayValue: "₦4,800,000" },
      { label: "Week 4", value: 720, displayValue: "₦3,900,000" },
    ]
  },
  Year: {
    peak: "₦18,400,000",
    peakLabel: "Aug",
    points: [
      { label: "Jan", value: 310, displayValue: "₦5,200,000" },
      { label: "Mar", value: 450, displayValue: "₦8,100,000" },
      { label: "May", value: 620, displayValue: "₦11,400,000" },
      { label: "Jul", value: 780, displayValue: "₦15,200,000" },
      { label: "Aug", value: 890, displayValue: "₦18,400,000" },
      { label: "Oct", value: 650, displayValue: "₦12,900,000" },
      { label: "Dec", value: 810, displayValue: "₦16,500,000" },
    ]
  }
};

export function SalesAnalyticsChart() {
  const [activeTab, setActiveTab] = useState<TimeRange>("Today");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const currentData = DATA_BY_RANGE[activeTab];
  const points = currentData.points;

  // Chart dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingBottom = 30;
  const paddingTop = 35;

  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const chartWidth = svgWidth - paddingX * 2;

  // Generate SVG coordinates
  const coords = points.map((p, index) => {
    const x = paddingX + (index / (points.length - 1)) * chartWidth;
    // Map value 0..1000 to y
    const normalizedY = Math.min(1000, Math.max(0, p.value)) / 1000;
    const y = paddingTop + chartHeight * (1 - normalizedY);
    return { x, y, ...p };
  });

  // Create smooth bezier curve path
  const createSmoothPath = (pts: Array<{ x: number; y: number }>) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = createSmoothPath(coords);
  const areaPath = coords.length > 0
    ? `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + chartHeight} L ${coords[0].x} ${paddingTop + chartHeight} Z`
    : "";

  // Highlighted point index (default to the peak or hovered point)
  const activeIndex = hoveredPoint !== null 
    ? hoveredPoint 
    : coords.findIndex(c => c.label === currentData.peakLabel) !== -1 
      ? coords.findIndex(c => c.label === currentData.peakLabel) 
      : Math.floor(coords.length * 0.7);

  const activeCoord = coords[activeIndex] || coords[coords.length - 1];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between h-full">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Sales Analytics</h3>
        </div>

        {/* Time Tabs */}
        <div className="flex items-center gap-6 border-b sm:border-b-0 border-gray-100 pb-2 sm:pb-0">
          {(["Today", "Week", "Month", "Year"] as TimeRange[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setHoveredPoint(null);
                }}
                className={`text-sm font-semibold transition-all relative pb-1 ${
                  isActive
                    ? "text-[#00875A] font-bold"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00875A] rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative w-full pt-2">
        <div className="flex">
          {/* Y Axis Labels */}
          <div className="flex flex-col justify-between text-[11px] font-semibold text-gray-400 pr-3 pb-7 select-none text-right w-12 flex-shrink-0 h-[210px]">
            <span>₦1M</span>
            <span>₦800k</span>
            <span>₦600k</span>
            <span>₦400k</span>
            <span>₦200k</span>
            <span>₦0</span>
          </div>

          {/* SVG Chart */}
          <div className="flex-1 relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-[210px] overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Emerald Gradient */}
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>

                {/* Horizontal Grid lines */}
                <pattern id="gridLines" width="100%" height="34" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect x={paddingX} y={paddingTop} width={chartWidth} height={chartHeight} fill="url(#gridLines)" />

              {/* Area Fill */}
              <path d={areaPath} fill="url(#emeraldGradient)" />

              {/* Main Line Curve */}
              <path
                d={linePath}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Vertical guideline on active point */}
              {activeCoord && (
                <line
                  x1={activeCoord.x}
                  y1={paddingTop}
                  x2={activeCoord.x}
                  y2={paddingTop + chartHeight}
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
              )}

              {/* Data points & Interactive Hover targets */}
              {coords.map((c, i) => (
                <g key={i}>
                  {/* Invisible wide hover area */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="16"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />

                  {/* Active highlighted circle */}
                  {i === activeIndex && (
                    <>
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="6"
                        fill="#059669"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="transition-all duration-200 shadow-lg"
                      />
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r="10"
                        fill="#10B981"
                        opacity="0.25"
                      />
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* Floating Tooltip matching design (pill with border & text) */}
            {activeCoord && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-200 z-20"
                style={{
                  left: `${(activeCoord.x / svgWidth) * 100}%`,
                  top: `${(activeCoord.y / svgHeight) * 210 - 10}px`,
                }}
              >
                <div className="bg-gray-950/90 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-sm whitespace-nowrap border border-gray-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span>{activeCoord.displayValue}</span>
                </div>
              </div>
            )}

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-1 px-2 select-none">
              {points.map((p, index) => (
                <span
                  key={index}
                  className={`text-center transition-colors ${
                    index === activeIndex ? "text-gray-900 font-bold" : ""
                  }`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

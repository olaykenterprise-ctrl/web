import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  growthText: string;
  icon: LucideIcon;
  variant: "emerald" | "blue" | "purple" | "orange";
}

const THEMES = {
  emerald: {
    bgIcon: "bg-[#E6F4EA] text-[#10B981]",
    growthColor: "text-[#10B981]"
  },
  blue: {
    bgIcon: "bg-[#E8F0FE] text-[#3B82F6]",
    growthColor: "text-[#10B981]"
  },
  purple: {
    bgIcon: "bg-[#F3E8FD] text-[#8B5CF6]",
    growthColor: "text-[#10B981]"
  },
  orange: {
    bgIcon: "bg-[#FEF3E6] text-[#F59E0B]",
    growthColor: "text-[#10B981]"
  }
};

export function StatCard({ title, value, growthText, icon: Icon, variant }: StatCardProps) {
  const theme = THEMES[variant];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-all duration-200 flex items-start gap-4">
      {/* Icon in Rounded Container */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${theme.bgIcon}`}>
        <Icon size={24} strokeWidth={2.2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500 tracking-tight">{title}</p>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-1">{value}</h3>
        <p className={`text-xs font-bold mt-1.5 flex items-center gap-1 ${theme.growthColor}`}>
          <span>▲</span>
          <span>{growthText}</span>
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ShoppingCart, User, Package, Megaphone } from "lucide-react";
import { Activity } from "@/lib/admin-data";

const ICON_MAP = {
  order: { icon: ShoppingCart, bg: "bg-[#E6F4EA]", text: "text-[#10B981]" },
  customer: { icon: User, bg: "bg-[#E8F0FE]", text: "text-[#3B82F6]" },
  stock: { icon: Package, bg: "bg-[#F3E8FD]", text: "text-[#8B5CF6]" },
  marketing: { icon: Megaphone, bg: "bg-[#FEF3E6]", text: "text-[#F59E0B]" },
  message: { icon: User, bg: "bg-[#E8F0FE]", text: "text-[#3B82F6]" }
};

interface RecentActivityFeedProps {
  activities: Activity[];
}

export function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Activity</h3>
        <Link
          href="/adminola/orders"
          className="text-xs font-bold text-[#00875A] hover:text-emerald-700 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Activity List */}
      <div className="space-y-4 flex-1 flex flex-col justify-around py-1">
        {activities.map((item) => {
          const config = ICON_MAP[item.type] || ICON_MAP.order;
          const Icon = config.icon;

          return (
            <div key={item.id} className="flex items-start justify-between gap-3 group">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg} ${config.text}`}>
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">{item.detail}</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap pl-2">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

import { Mail, Search, Reply } from "lucide-react";
import { getCustomerMessages } from "@/lib/admin-data";

export default function AdminMessagesPage() {
  const messages = getCustomerMessages();
  const unreadCount = messages.filter((m) => m.status === "New").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Customer Messages & Inquiries</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Read and respond to inquiries submitted via the store Contact form in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
            <Mail size={15} className="text-[#00875A]" />
            <span>
              {messages.length} Total ({unreadCount} New)
            </span>
          </span>
        </div>
      </div>

      {/* Messages List Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden divide-y divide-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 transition-colors hover:bg-gray-50/80 ${
              msg.status === "New" ? "bg-emerald-50/20" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center">
                  {msg.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span>{msg.name}</span>
                    <span className="text-xs font-normal text-gray-400">({msg.email})</span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    msg.status === "New"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {msg.status}
                </span>
                <span className="text-xs text-gray-400">{msg.date}</span>
              </div>
            </div>

            <div className="mt-2 pl-11">
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-2">
                {msg.subject}
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">{msg.message}</p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00875A] hover:text-emerald-800 transition-colors"
                >
                  <Reply size={14} /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-xs">
            No customer inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Megaphone,
  Mail,
  Settings,
  HelpCircle,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Store,
  LayoutTemplate
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Activity } from "@/lib/admin-data";

export function ClientAdminLayout({
  children,
  pendingOrdersCount = 0,
  unreadMessagesCount = 0,
  activities = [],
}: {
  children: React.ReactNode;
  pendingOrdersCount?: number;
  unreadMessagesCount?: number;
  activities?: Activity[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("admin@company.com");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    }
    fetchUser();
  }, [supabase.auth]);

  if (pathname === "/adminola/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/adminola/login");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/adminola", icon: LayoutDashboard },
    { name: "Orders", href: "/adminola/orders", icon: ShoppingCart, badge: pendingOrdersCount > 0 ? pendingOrdersCount.toString() : undefined },
    { name: "Products", href: "/adminola/products", icon: Package },
    { name: "Landing Pages", href: "/adminola/landing-pages", icon: LayoutTemplate },
    { name: "Customers", href: "/adminola/customers", icon: Users },
    { name: "Analytics", href: "/adminola/analytics", icon: BarChart3 },
    { name: "Marketing", href: "/adminola/marketing", icon: Megaphone },
    { name: "Messages", href: "/adminola/messages", icon: Mail, badge: unreadMessagesCount > 0 ? unreadMessagesCount.toString() : undefined },
    { name: "Settings", href: "/adminola/settings", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between text-gray-300">
      <div>
        {/* Brand Logo Header */}
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00875A] flex items-center justify-center text-white shadow-md shadow-[#00875A]/20">
            {/* Custom stylized M/wave brand emblem */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdminPanel</span>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/adminola" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 group ${
                  isActive
                    ? "bg-[#00875A] text-white shadow-sm font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={19}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? "text-white" : "text-gray-400 group-hover:text-white transition-colors"}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#00875A] text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User & Support Section */}
      <div className="p-4 border-t border-white/5 space-y-3">
        <Link
          href="/contact"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
        >
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </Link>

        {/* User Card */}
        <div className="pt-2 flex items-center justify-between px-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Admin User</p>
              <p className="text-[11px] text-gray-400 truncate">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            title="Log Out"
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex font-sans antialiased text-gray-900">
      {/* Desktop Sidebar (Dark Navy #0B1320) */}
      <aside className="w-[240px] bg-[#0B1320] flex-col hidden lg:flex flex-shrink-0 border-r border-gray-900/50 shadow-xl z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-[260px] bg-[#0B1320] flex flex-col z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white p-2"
          >
            <X size={22} />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Main App Layout */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200/80 px-4 sm:px-8 flex items-center justify-between flex-shrink-0 z-10">
          {/* Left: Mobile Menu & Search Input */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Pill Search Input */}
            <div className="relative w-full max-w-sm hidden sm:block">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#F4F7FB] border border-transparent hover:border-gray-200 focus:border-emerald-500 focus:bg-white text-xs font-medium pl-9 pr-4 py-2 rounded-full outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            {/* View Live Store */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-50 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
            >
              <Store size={14} />
              <span>Live Store</span>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell size={19} />
                {activities.length > 0 && activities[0].id !== "act-empty" && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#00875A] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                    {activities.length}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">Notifications</span>
                      {activities.length > 0 && activities[0].id !== "act-empty" && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{activities.length} New</span>
                      )}
                    </div>
                    <div className="divide-y divide-gray-50 text-xs">
                      {activities.length === 0 || activities[0].id === "act-empty" ? (
                        <div className="px-4 py-8 text-center text-gray-400">
                          No new notifications
                        </div>
                      ) : (
                        activities.map((act) => (
                          <div key={act.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                            <p className="font-bold text-gray-900">{act.title}</p>
                            <p className="text-gray-500 text-[11px] mt-0.5">{act.detail}</p>
                            <span className="text-[10px] text-gray-400 mt-1 block">{act.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-gray-800 hidden sm:block">Admin User</span>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900">Admin User</p>
                      <p className="text-[11px] text-gray-400 truncate">{userEmail}</p>
                    </div>
                    <Link
                      href="/adminola/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={15} className="text-gray-400" />
                      Account Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut size={15} />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

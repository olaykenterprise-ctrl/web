"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Store, Settings, FileText, Menu, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: "Products", href: "/adminola/products", icon: Package },
    { name: "Landing Pages", href: "/adminola/landing-pages", icon: FileText },
    { name: "Settings", href: "/adminola/settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8 pb-4">
        <h2 className="text-3xl font-black text-white tracking-tighter">
          ADMIN<span className="text-[#FFC107]">OLA</span>
        </h2>
        <p className="text-gray-500 text-xs mt-1 font-bold tracking-wider uppercase">Command Center</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/adminola" && pathname.startsWith(`${item.href}/`));
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all relative overflow-hidden group ${
                isActive
                  ? "bg-[#FFC107] text-gray-950 shadow-lg shadow-[#FFC107]/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              )}
              <item.icon size={22} className="relative z-10" />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-900 space-y-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-gray-400 bg-gray-900 hover:bg-gray-800 hover:text-white transition-all border border-gray-800"
          target="_blank"
        >
          <Store size={20} />
          View Live Store
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          Secure Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="w-[280px] bg-gray-950 flex-col hidden lg:flex border-r border-gray-900 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-gray-950 flex flex-col z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 capitalize hidden sm:block">
                {pathname === "/adminola" ? "Dashboard Overview" : pathname.split('/').pop()?.replace('-', ' ')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFC107] to-orange-400 flex items-center justify-center text-white font-bold shadow-lg">
               A
             </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto pb-20">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

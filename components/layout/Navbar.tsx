"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShopStore } from "@/lib/store";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Truck,
  Zap,
  Phone,
  ShieldCheck,
  ChevronDown,
  Grid,
  Home,
  Tag,
  X,
  ChevronRight
} from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Zustand Store
  const cart = useShopStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Powerbanks", slug: "powerbanks" },
    { name: "Magnetic Powerbanks", slug: "magnetic-powerbanks" },
    { name: "Cables & Chargers", slug: "cables" },
    { name: "Phone Accessories", slug: "phone-accessories" },
    { name: "Content Creation Tools", slug: "content-creation" },
  ];

  return (
    <>
      {/* Top Promo Bar (Desktop) */}
      <div className="hidden md:flex justify-between items-center bg-gray-100 text-xs text-gray-600 px-8 py-2 border-b">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Truck size={14} /> Nationwide Delivery Across Nigeria</span>
          <span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure Payments – Pay on Delivery Available</span>
        </div>
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Zap size={14} /> Fast & Reliable Service</span>
          <span className="flex items-center gap-2"><Phone size={14} /> 24/7 Customer Support</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-40 border-b shadow-sm relative">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              <Link href="/" className="flex items-center">
                <img src="/logo.png" alt="OYK Logo" className="h-10 w-auto" />
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex w-full border-2 border-primary rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <input 
                  type="text" 
                  placeholder="Search powerbanks, cables, mics, ring lights..." 
                  className="w-full px-4 py-2 outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-primary text-white px-6 py-2 hover:bg-primary-dark transition">
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6 text-gray-700">
              <Link href="/track" className="hidden md:flex flex-col items-center gap-1 hover:text-primary transition group">
                <Truck size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span className="text-[11px] font-medium">Track Order</span>
              </Link>
              <Link href="/wishlist" className="hidden md:flex flex-col items-center gap-1 hover:text-primary transition group">
                <Heart size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span className="text-[11px] font-medium">Wishlist</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center gap-1 hover:text-primary transition group relative">
                <div className="relative">
                  <ShoppingCart size={24} className="group-hover:-translate-y-1 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium hidden md:block">Cart</span>
              </Link>
              <Link href="/account" className="hidden md:flex flex-col items-center gap-1 hover:text-primary transition group">
                <User size={20} className="group-hover:-translate-y-1 transition-transform" />
                <span className="text-[11px] font-medium">Account</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar (Below Header) */}
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch} className="flex w-full border-2 border-primary rounded-lg overflow-hidden">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-3 py-2 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-primary text-white px-4 py-2">
                <Search size={18} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Desktop Category Navigation */}
      <nav className="hidden md:block bg-white border-b shadow-sm relative">
        <div className="container-custom flex items-center gap-6">
          
          <div 
            className="relative"
            onMouseEnter={() => setIsDesktopDropdownOpen(true)}
            onMouseLeave={() => setIsDesktopDropdownOpen(false)}
          >
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-3 font-semibold text-sm">
              <Grid size={18} />
              All Categories
              <ChevronDown size={16} className={`transition-transform ${isDesktopDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Desktop Dropdown Panel */}
            {isDesktopDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl z-50 rounded-b-lg py-2">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700 w-full overflow-x-auto hide-scrollbar whitespace-nowrap py-3">
            <li><Link href="/" className="hover:text-primary transition text-primary font-bold">Home</Link></li>
            {categories.slice(0,4).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="hover:text-primary transition">{cat.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/deals" className="hover:text-primary transition flex items-center gap-1">
                Deals <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">Hot</span>
              </Link>
            </li>
            <li><Link href="/new-arrivals" className="hover:text-primary transition font-semibold">New Arrivals</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Slide-out Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Drawer */}
          <div className="relative w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
               <img src="/logo.png" alt="OYK Logo" className="h-8 w-auto" />
               <button 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
               >
                 <X size={20} />
               </button>
            </div>
            
            {/* Drawer Content */}
            <div className="flex-1 py-4">
               <div className="px-4 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">Menu</div>
               <nav className="flex flex-col mb-6">
                 <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                    <span className="font-medium">Home</span>
                 </Link>
                 <Link href="/deals" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-primary font-bold hover:bg-gray-50">
                    <span className="flex items-center gap-2">Deals <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Hot</span></span>
                 </Link>
                 <Link href="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50">
                    <span className="font-medium">New Arrivals</span>
                 </Link>
               </nav>

               <div className="px-4 mb-2 text-xs font-bold text-gray-400 tracking-wider uppercase">Categories</div>
               <nav className="flex flex-col mb-6 border-b border-gray-100 pb-4">
                 {categories.map((cat) => (
                   <Link 
                     key={cat.slug} 
                     href={`/category/${cat.slug}`}
                     onClick={() => setIsMobileMenuOpen(false)} 
                     className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary"
                   >
                     <span>{cat.name}</span>
                     <ChevronRight size={16} className="text-gray-300" />
                   </Link>
                 ))}
               </nav>

               <nav className="flex flex-col px-4 gap-2 pb-8">
                 <Link href="/track" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm text-gray-600 py-2">
                    <Truck size={18} /> Track Order
                 </Link>
                 <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm text-gray-600 py-2">
                    <Heart size={18} /> Wishlist
                 </Link>
                 <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-sm text-gray-600 py-2">
                    <Phone size={18} /> Contact Support
                 </Link>
               </nav>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation (Sticky) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 px-2 py-2 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center gap-1 w-1/4 text-primary">
          <Home size={22} />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 w-1/4 text-gray-500 hover:text-primary"
        >
          <Grid size={22} />
          <span className="text-[10px] font-medium">Categories</span>
        </button>
        <Link href="/deals" className="flex flex-col items-center gap-1 w-1/4 text-gray-500 hover:text-primary relative">
          <Tag size={22} />
          <span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-sm">Hot</span>
          <span className="text-[10px] font-medium">Deals</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 w-1/4 text-gray-500 hover:text-primary">
          <User size={22} />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
      
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden"></div>
    </>
  );
}

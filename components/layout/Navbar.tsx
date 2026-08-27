"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShopStore } from "@/lib/store";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  X,
  ChevronRight,
  Phone,
  Grid
} from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
      setIsSearchOpen(false);
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
      {/* Top Announcement Bar */}
      <div className="bg-[#1e0736] text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="container-custom flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Truck size={13} className="text-accent" />
            <span className="font-medium tracking-wide">Free Shipping Nationwide</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck size={13} className="text-accent" />
            <span className="font-medium tracking-wide">100% Genuine Products</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <RotateCcw size={13} className="text-accent" />
            <span className="font-medium tracking-wide">Easy Returns & Refunds</span>
          </div>
        </div>
      </div>

      {/* Main Clean White Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-xs">
        <div className="container-custom py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Button & Brand Logo */}
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-32 h-10 sm:w-40 sm:h-12 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.svg"
                    alt="OlaYK Enterprise"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-gray-600">
              <Link href="/" className="text-gray-900 font-bold hover:text-primary transition-colors">
                Home
              </Link>
              
              {/* Categories Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-primary transition-colors py-2">
                  <span>Categories</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isCategoriesOpen ? "rotate-180 text-primary" : ""}`} />
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.slug} 
                        href={`/category/${cat.slug}`}
                        className="block px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Search Toggle */}
              <div className="relative">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
                    <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-primary">
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full bg-transparent text-xs text-gray-900 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button type="submit" className="text-gray-400 hover:text-primary">
                        <Search size={16} />
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Account */}
              <Link 
                href="/adminola" 
                className="hidden sm:flex p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                title="Account / Admin"
              >
                <User size={20} />
              </Link>

              {/* Cart Button */}
              <Link 
                href="/cart" 
                className="p-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute 1 top-0.5 right-0.5 bg-accent text-primary-dark text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Contact Us CTA Button */}
              <Link 
                href="/contact"
                className="hidden md:inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="relative w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="relative w-28 h-8">
                  <Image
                    src="/logo.svg"
                    alt="OlaYK Enterprise"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Drawer Body */}
            <div className="p-5 flex-1">
              {/* Search inside mobile menu */}
              <form onSubmit={handleSearch} className="mb-6 flex items-center bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-transparent text-xs text-gray-900 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="text-gray-400">
                  <Search size={16} />
                </button>
              </form>

              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Navigation</div>
              <nav className="flex flex-col gap-1 mb-6">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-bold text-sm text-primary bg-primary/5"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-50"
                >
                  About Us
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-medium text-sm text-gray-700 hover:bg-gray-50"
                >
                  Contact Support
                </Link>
              </nav>

              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Categories</div>
              <nav className="flex flex-col gap-1 mb-6">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Drawer Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <Link 
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl text-xs shadow-sm"
              >
                <Phone size={14} /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 z-40 px-6 py-2.5 flex justify-between items-center shadow-lg">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary"
        >
          <Grid size={20} />
          <span className="text-[10px] font-medium">Categories</span>
        </button>

        <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-accent text-primary-dark text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
      </div>
    </>
  );
}

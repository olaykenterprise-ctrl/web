import Link from "next/link";
import { ChevronDown, Zap } from "lucide-react";

// Inline Brand SVG icons for reliability across all lucide-react versions
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-gray-300 py-12 border-t border-primary-dark">
      <div className="container-custom">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 pr-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="OlaYKEnterprise Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Your trusted store for powerbanks, phone accessories and content creation tools at the best prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><FacebookIcon size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><InstagramIcon size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><TwitterIcon size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><YoutubeIcon size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition">Shop All</Link></li>
              <li><Link href="/deals" className="hover:text-primary transition">Deals</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-primary transition">New Arrivals</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Customer Care</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition">Returns & Refunds</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Help & Support</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/payment-methods" className="hover:text-primary transition">Payment Methods</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/warranty" className="hover:text-primary transition">Warranty Policy</Link></li>
              <li><Link href="/how-to-order" className="hover:text-primary transition">How to Order</Link></li>
              <li><Link href="/report-issue" className="hover:text-primary transition">Report an Issue</Link></li>
            </ul>
          </div>

          {/* We Accept */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">We Accept</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center h-8">
                <span className="text-[10px] font-bold text-blue-800">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center h-8">
                <div className="flex">
                  <div className="w-3 h-3 rounded-full bg-red-500 -mr-1 mix-blend-multiply"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mix-blend-multiply"></div>
                </div>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center h-8">
                <span className="text-[10px] font-bold text-red-600">Verve</span>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center h-8">
                <span className="text-[10px] font-bold text-black">Pay</span>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center h-8">
                <span className="text-[10px] font-bold text-gray-600">G Pay</span>
              </div>
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center h-8">
                <span className="text-[10px] font-bold text-green-600">OPay</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-500">Also available: Bank Transfer, USSD</p>
          </div>

        </div>

        {/* Mobile Layout (Accordions) */}
        <div className="md:hidden flex flex-col gap-0 mb-8 divide-y divide-gray-800">
          <details className="group">
            <summary className="flex justify-between items-center font-semibold text-sm text-white py-4 cursor-pointer list-none">
              CUSTOMER CARE
              <span className="transition group-open:rotate-180">
                <ChevronDown size={16} />
              </span>
            </summary>
            <ul className="text-xs text-gray-400 pb-4 space-y-3 px-2">
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Shipping & Delivery</Link></li>
            </ul>
          </details>

          <details className="group">
            <summary className="flex justify-between items-center font-semibold text-sm text-white py-4 cursor-pointer list-none">
              ABOUT US
              <span className="transition group-open:rotate-180">
                <ChevronDown size={16} />
              </span>
            </summary>
            <ul className="text-xs text-gray-400 pb-4 space-y-3 px-2">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/shop">Shop All</Link></li>
            </ul>
          </details>

          <details className="group">
            <summary className="flex justify-between items-center font-semibold text-sm text-white py-4 cursor-pointer list-none">
              HELP & SUPPORT
              <span className="transition group-open:rotate-180">
                <ChevronDown size={16} />
              </span>
            </summary>
            <ul className="text-xs text-gray-400 pb-4 space-y-3 px-2">
              <li><Link href="/returns">Returns & Refunds</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center font-semibold text-sm text-white py-4 cursor-pointer list-none">
              FOLLOW US
              <span className="transition group-open:rotate-180">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="flex gap-6 pb-4 px-2">
              <a href="#" className="text-gray-400 hover:text-white"><FacebookIcon size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><InstagramIcon size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><TwitterIcon size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><YoutubeIcon size={20} /></a>
            </div>
          </details>
          
          {/* Mobile Branding */}
          <div className="py-6 flex flex-col items-center border-t border-primary-dark mt-2">
            <Link href="/" className="flex items-center bg-white p-1 rounded">
              <img src="/logo.svg" alt="OYK Logo" className="h-10 w-auto" />
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800 text-[10px] text-gray-500">
          <p>© 2026 olaykenterprise. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">Proudly Nigerian <span className="text-green-500 font-bold">NG</span></p>
        </div>
      </div>
    </footer>
  );
}

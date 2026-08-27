import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="container-custom mt-3 sm:mt-6 mb-8 sm:mb-12">
      <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-gray-100/80 shadow-xs flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Editorial Content */}
        <div className="p-6 sm:p-10 md:p-14 lg:p-16 lg:w-[58%] flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase">
              Quality • Style • Value
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-5 tracking-tight">
            Premium Products for a{" "}
            <span className="text-primary italic font-medium">Better You</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-8 max-w-lg leading-relaxed">
            Discover top-quality products for your home, lifestyle and everyday needs — all in one trusted store.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <Link 
              href="/"
              className="bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5 inline-flex items-center gap-2 text-sm"
            >
              <span>Shop Now</span>
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="#categories" 
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold px-7 py-3.5 rounded-xl transition-all shadow-xs inline-flex items-center text-sm"
            >
              Browse Categories
            </Link>
          </div>

          {/* Trust Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Genuine Products</p>
                <p className="text-[11px] text-gray-500">100% Authentic</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center shrink-0">
                <Truck size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Fast & Reliable</p>
                <p className="text-[11px] text-gray-500">Nationwide Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <RotateCcw size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Hassle-Free Returns</p>
                <p className="text-[11px] text-gray-500">Shop with Confidence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Lifestyle Visual Container */}
        <div className="relative w-full lg:w-[42%] min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] flex items-end justify-center self-stretch overflow-hidden bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent">
          <Image
            src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1200&auto=format&fit=crop"
            alt="Customer shopping at OlaYK Enterprise"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />

          {/* Floating Brand Bag Tag */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs">
              OYK
            </div>
            <div>
              <p className="text-xs font-black text-gray-900 leading-tight">OLAYK ENTERPRISE</p>
              <p className="text-[10px] text-gray-500 font-medium">Verified Customer</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

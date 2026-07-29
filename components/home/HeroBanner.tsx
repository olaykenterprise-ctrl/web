import Image from "next/image";
import Link from "next/link";
import { Star, Zap } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="container-custom mt-4 mb-8">
      <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden relative flex flex-col md:flex-row items-center md:items-stretch min-h-[400px]">
        {/* Text Content */}
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10">
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase font-semibold mb-4">
            POWER YOUR LIFE. <br className="hidden md:block" /> CREATE WITHOUT LIMITS.
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Affordable Power.<br />
            <span className="text-primary-light">Powerful</span> Accessories.
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md leading-relaxed">
            Quality powerbanks, phone accessories and content creation tools – all at the best prices.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/shop" className="bg-accent hover:bg-accent-dark text-primary-dark px-8 py-3 rounded-full font-bold transition-colors hover:scale-105 inline-block">
              Shop Now
            </Link>
            <Link href="/deals" className="bg-transparent border border-gray-600 hover:border-white text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Today's Deals
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#0a0a0a]"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#0a0a0a]"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#0a0a0a]"></div>
            </div>
            <div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400" />)}
              </div>
              <p className="text-white text-xs font-semibold">
                Trusted by <br className="md:hidden" /> <span className="font-normal text-gray-400">10,000+ Customers</span>
              </p>
            </div>
          </div>
        </div>

        {/* Image Composition Container */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
          {/* We'll use CSS shapes to simulate the products since we don't have actual images */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-gray-800 to-gray-700 rounded-3xl rotate-12 opacity-50 blur-xl"></div>
          
          {/* Simulated Products for mockup purposes */}
          <div className="absolute right-[10%] top-[10%] w-[120px] h-[240px] bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-2xl z-10 flex flex-col justify-between p-4">
             <div className="text-right text-gray-500 font-mono text-xl">100</div>
             <div className="text-center text-gray-600 text-xs mt-auto">olaykenterprise</div>
             <div className="text-right text-gray-400 text-lg font-bold mt-2">22.5W</div>
          </div>
          
          <div className="absolute left-[20%] bottom-[20%] w-[100px] h-[140px] bg-white rounded-xl shadow-2xl z-20 flex items-center justify-center">
             <div className="w-[60px] h-[60px] rounded-full border-4 border-gray-100 flex items-center justify-center">
               <Zap size={24} className="text-gray-300" />
             </div>
          </div>

          <div className="absolute right-[40%] bottom-[15%] w-[60px] h-[60px] bg-white rounded-2xl shadow-xl z-30 flex items-end justify-center pb-2">
             <div className="w-4 h-4 bg-gray-200 rounded-full mx-1"></div>
             <div className="w-4 h-4 bg-gray-200 rounded-full mx-1"></div>
          </div>
          
          <div className="absolute left-[5%] top-[20%] w-[80px] h-[160px] bg-gray-800 rounded-xl border border-gray-700 shadow-lg z-0 -rotate-12 flex items-center justify-center">
            <div className="w-[40px] h-[40px] rounded-full border border-green-500 flex items-center justify-center">
              <Zap size={16} className="text-green-500 fill-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export function PromoBanners() {
  return (
    <div className="container-custom mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner 1: Purple */}
        <div className="bg-primary rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] group cursor-pointer hover:shadow-lg transition-shadow">
          <div className="absolute top-4 right-4">
            <Heart size={20} className="text-white/60 hover:text-white transition-colors" />
          </div>
          <div className="z-10 w-2/3">
            <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Power Up Anywhere!</p>
            <h3 className="text-white text-2xl font-bold leading-tight mb-4">High Capacity Powerbanks for Every Lifestyle</h3>
            <Link href="/category/powerbanks" className="inline-flex items-center gap-1 text-white text-sm font-semibold hover:underline">
              Shop Powerbanks <ArrowRight size={16} />
            </Link>
          </div>
          
          {/* Simulated products */}
          <div className="absolute -right-4 -bottom-8 w-48 h-48 flex items-end">
            <div className="w-24 h-32 bg-[#1a1a1a] rounded-xl transform -rotate-12 translate-x-12 shadow-2xl border border-gray-800"></div>
            <div className="w-24 h-28 bg-white rounded-xl shadow-2xl border border-gray-200"></div>
          </div>
        </div>

        {/* Column for Banner 2 & 3 */}
        <div className="grid grid-cols-1 gap-6">
          {/* Banner 2: Dark Gray */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px] group cursor-pointer hover:shadow-lg transition-shadow">
             <div className="absolute top-4 right-4">
              <Heart size={20} className="text-white/60 hover:text-white transition-colors" />
            </div>
            <div className="z-10 w-2/3">
              <p className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">Stay Charged!</p>
              <h3 className="text-white text-lg font-bold leading-tight mb-2">Magnetic Powerbanks<br/>Fast. Wireless. Convenient.</h3>
              <Link href="/category/magnetic" className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline">
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
            {/* Simulated product */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 flex items-end opacity-90">
              <div className="w-24 h-28 bg-gray-200 rounded-xl transform rotate-12 shadow-2xl border border-gray-300"></div>
            </div>
          </div>

          {/* Banner 3: Black */}
          <div className="bg-[#0a0a0a] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[140px] group cursor-pointer hover:shadow-lg transition-shadow">
             <div className="absolute top-4 right-4">
              <Heart size={20} className="text-white/60 hover:text-white transition-colors" />
            </div>
            <div className="z-10 w-2/3">
              <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-wider mb-1">Create Like A Pro!</p>
              <h3 className="text-white text-lg font-bold leading-tight mb-2">Content Creation Tools for Creators</h3>
              <Link href="/category/content-creation" className="inline-flex items-center gap-1 text-yellow-500 text-xs font-semibold hover:underline">
                Shop Tools <ArrowRight size={14} />
              </Link>
            </div>
            {/* Simulated product */}
            <div className="absolute right-2 -bottom-2 w-24 h-24 flex items-end justify-center">
               <div className="w-16 h-16 rounded-full border-4 border-white/20 mb-4 flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full border-4 border-white/40"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

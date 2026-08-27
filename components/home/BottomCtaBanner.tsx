import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export function BottomCtaBanner() {
  return (
    <section className="container-custom mb-16 sm:mb-24">
      <div className="bg-[#1e0736] rounded-3xl p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Subtle Background Botanical Gradient Flare */}
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-primary-light/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Icon & Text */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/20 border border-accent/30 text-accent flex items-center justify-center shrink-0">
            <Gift size={30} />
          </div>
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              Join Our Happy Customers Today!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Quality products. Great prices. Trusted service.
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="relative z-10 shrink-0">
          <Link
            href="/"
            className="bg-accent hover:bg-accent-dark text-primary-dark font-black text-xs sm:text-sm px-8 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}

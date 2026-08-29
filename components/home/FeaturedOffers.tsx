import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllLandingPages } from "@/lib/db";
import Image from "next/image";

export async function FeaturedOffers() {
  const offers = await getAllLandingPages();
  if (!offers || offers.length === 0) return null;

  return (
    <section className="container-custom mb-14 sm:mb-20">
      {/* Header Row */}
      <div className="flex items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">✨</span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Exclusive Offers
            </h2>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Special deals and exclusive landing page offers just for you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {offers.map((offer) => {
          // Try to find an image block or use a default gradient
          const imageBlock = offer.blocks.find(b => b.type === 'headline' && b.data.backgroundImage) || 
                             offer.blocks.find(b => b.type === 'media' && b.data.url);
          const imageUrl = imageBlock?.data.backgroundImage || imageBlock?.data.url || null;

          return (
            <Link 
              href={`/${offer.slug}`} 
              key={offer.id} 
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
                    <Sparkles className="text-emerald-300 w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  Special Offer
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {offer.title}
                </h3>
                {offer.description && (
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
                    {offer.description}
                  </p>
                )}
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">View Offer</span>
                  <ArrowRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

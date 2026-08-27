import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CategoryIcons() {
  const categories = [
    {
      name: "Fashion & Apparel",
      slug: "fashion",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Home & Living",
      slug: "home-living",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Beauty & Personal Care",
      slug: "beauty",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Electronics & Accessories",
      slug: "powerbanks",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Health & Fitness",
      slug: "fitness",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Lifestyle",
      slug: "lifestyle",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section id="categories" className="container-custom mb-14 sm:mb-20 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="font-editorial text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
          Shop by Category
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Find everything you need, all in one place.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col"
          >
            {/* Category Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>

            {/* Category Label */}
            <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white flex-1">
              <span className="font-bold text-xs sm:text-[13px] text-gray-800 group-hover:text-primary transition-colors leading-tight line-clamp-1">
                {category.name}
              </span>
              <ChevronRight
                size={14}
                className="text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

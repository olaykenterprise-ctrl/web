import Image from "next/image";
import { CheckCircle2, Lock, Truck, Headphones } from "lucide-react";

export function TrustSection() {
  const trustPoints = [
    {
      icon: <CheckCircle2 size={18} className="text-emerald-700" />,
      badgeBg: "bg-emerald-50",
      title: "100% Genuine Products",
      description: "We source only authentic and high-quality items.",
    },
    {
      icon: <Lock size={18} className="text-primary" />,
      badgeBg: "bg-primary/10",
      title: "Secure & Safe Shopping",
      description: "Your data and payments are always protected.",
    },
    {
      icon: <Truck size={18} className="text-accent-dark" />,
      badgeBg: "bg-accent/15",
      title: "Fast Nationwide Delivery",
      description: "Get your orders quickly, wherever you are.",
    },
    {
      icon: <Headphones size={18} className="text-primary" />,
      badgeBg: "bg-primary/10",
      title: "Dedicated Customer Support",
      description: "We're always ready to assist you.",
    },
  ];

  return (
    <section className="container-custom mb-14 sm:mb-20">
      <div className="bg-[#F4F9F6] rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-200/70 shadow-xs flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* Left Customer Avatar / Photo */}
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 shrink-0 rounded-3xl overflow-hidden shadow-sm border-4 border-white">
          <Image
            src="/logo.svg"
            alt="OlaYK Enterprise Logo"
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 150px, 220px"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight mb-2">
            Why Trust Olayk Enterprise?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 max-w-xl">
            More than a store — a commitment to quality, value and your satisfaction.
          </p>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {trustPoints.map((point, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100/90 shadow-xs flex items-start gap-3.5 text-left"
              >
                <div className={`w-9 h-9 rounded-xl ${point.badgeBg} flex items-center justify-center shrink-0`}>
                  {point.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                    {point.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

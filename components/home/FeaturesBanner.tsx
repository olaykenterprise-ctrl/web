import { ShieldCheck, Award, Lock, Truck, Headphones } from "lucide-react";

export function FeaturesBanner() {
  const items = [
    {
      icon: <ShieldCheck size={20} className="text-primary" />,
      title: "Why Shop With Us?",
      subtitle: "Your satisfaction is our top priority.",
      highlight: true,
    },
    {
      icon: <Award size={20} className="text-primary" />,
      title: "Quality Guaranteed",
      subtitle: "We sell only the best, trusted and authentic products.",
    },
    {
      icon: <Lock size={20} className="text-primary" />,
      title: "Secure Payments",
      subtitle: "Your transactions are safe and protected.",
    },
    {
      icon: <Truck size={20} className="text-primary" />,
      title: "Fast & Reliable Delivery",
      subtitle: "Get your orders when you need them.",
    },
    {
      icon: <Headphones size={20} className="text-primary" />,
      title: "Excellent Customer Support",
      subtitle: "We're here to help, 7 days a week.",
    },
  ];

  return (
    <div className="container-custom mb-12 sm:mb-16">
      <div className="bg-[#F5F8F6] rounded-2xl p-5 sm:p-6 border border-gray-200/60 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-center divide-y sm:divide-y-0 lg:divide-x divide-gray-200/70">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3.5 ${index > 0 ? "pt-4 sm:pt-0 lg:pl-4" : ""}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

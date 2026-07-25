import Link from "next/link";
import { 
  BatteryCharging, 
  Magnet, 
  Cable, 
  Smartphone, 
  Shield, 
  Headphones, 
  Camera, 
  Lightbulb, 
  Mic, 
  Grid 
} from "lucide-react";

export function CategoryIcons() {
  const categories = [
    { name: "Powerbanks", icon: <BatteryCharging size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/powerbanks" },
    { name: "Magnetic Powerbanks", icon: <Magnet size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/magnetic" },
    { name: "Cables & Chargers", icon: <Cable size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/cables" },
    { name: "Phone Holders", icon: <Smartphone size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/holders" },
    { name: "Cases & Protection", icon: <Shield size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/cases" },
    { name: "Audio & Earbuds", icon: <Headphones size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/audio" },
    { name: "Tripods & Stands", icon: <Camera size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/tripods" },
    { name: "Ring Lights", icon: <Lightbulb size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/ring-lights" },
    { name: "Microphones", icon: <Mic size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/category/microphones" },
    { name: "All Categories", icon: <Grid size={28} className="text-gray-600 group-hover:text-primary transition-colors" />, href: "/categories" },
  ];

  return (
    <div className="container-custom mb-12">
      <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((category, index) => (
          <Link key={index} href={category.href} className="group flex flex-col items-center gap-3 w-[80px] md:w-[100px] flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-50 transition-colors border border-gray-100 group-hover:border-purple-200">
              {category.icon}
            </div>
            <span className="text-[11px] md:text-xs text-center font-medium text-gray-700 group-hover:text-primary transition-colors leading-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

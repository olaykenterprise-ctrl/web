import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturesBanner } from "@/components/home/FeaturesBanner";
import { CategoryIcons } from "@/components/home/CategoryIcons";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustSection } from "@/components/home/TrustSection";
import { BottomCtaBanner } from "@/components/home/BottomCtaBanner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturesBanner />
      <CategoryIcons />
      <FeaturedProducts />
      <TrustSection />
      <BottomCtaBanner />
    </>
  );
}

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroBanner } from '@/components/home/HeroBanner';
import { FeaturesBanner } from '@/components/home/FeaturesBanner';
import { CategoryIcons } from '@/components/home/CategoryIcons';
import { FlashSale } from '@/components/home/FlashSale';
import { NewArrivals } from '@/components/home/NewArrivals';
import { WhyShopWithUs } from '@/components/home/WhyShopWithUs';
import { PromoBanners } from '@/components/home/PromoBanners';
import { Newsletter } from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <FeaturesBanner />
        <CategoryIcons />
        <FlashSale />
        <NewArrivals />
        <WhyShopWithUs />
        <PromoBanners />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

import { createClient } from "@/utils/supabase/server";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isFlashSale: boolean;
  isNewArrival: boolean;
  discountBadge?: string;
  
  // Rich Fields
  galleryImages?: string[];
  soldCount?: number;
  variants?: any[];
  keyFeatures?: any[];
  richContent?: any;
  whatsInTheBox?: string[];
  specifications?: any;
};

export type LandingPage = {
  id: string;
  slug: string;
  title: string;
  subheading: string;
  bodyList: string[];
  photos: string[];
  videoLink?: string;
  ctaLink?: string;
  createdAt: string;
};

function mapProduct(data: any): Product {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    originalPrice: data.original_price,
    currency: data.currency,
    image: data.image,
    category: data.category,
    rating: data.rating,
    reviews: data.reviews,
    isFlashSale: data.is_flash_sale,
    isNewArrival: data.is_new_arrival,
    discountBadge: data.discount_badge,
    galleryImages: data.gallery_images,
    soldCount: data.sold_count,
    variants: data.variants,
    keyFeatures: data.key_features,
    richContent: data.rich_content,
    whatsInTheBox: data.whats_in_the_box,
    specifications: data.specifications,
  };
}

function mapLandingPage(data: any): LandingPage {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    subheading: data.subheading,
    bodyList: data.body_list,
    photos: data.photos,
    videoLink: data.video_link,
    ctaLink: data.cta_link,
    createdAt: data.created_at,
  };
}

export async function getFlashSaleProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_flash_sale", true);
  return (data || []).map(mapProduct);
}

export async function getNewArrivals(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_new_arrival", true);
  return (data || []).map(mapProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createClient();
  const lowercaseQuery = query.toLowerCase();
  
  const { data } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${lowercaseQuery}%,description.ilike.%${lowercaseQuery}%,category.ilike.%${lowercaseQuery}%`);
    
  return (data || []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
    
  return data ? mapProduct(data) : null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", categorySlug);
  return (data || []).map(mapProduct);
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", slug)
    .single();
    
  return data ? mapLandingPage(data) : null;
}

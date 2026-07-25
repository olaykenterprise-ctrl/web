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
};

const makeSvgPlaceholder = (text: string) => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="%235100ff">${encodeURIComponent(text)}</text></svg>`;

// Mock Database
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "20000mAh Powerbank 22.5W Fast Charge",
    slug: "20000mah-powerbank-22-5w",
    description: "High capacity powerbank with fast charging capabilities.",
    price: 11900,
    originalPrice: 18000,
    currency: "NGN",
    image: makeSvgPlaceholder("20000mAh Powerbank"),
    category: "powerbanks",
    rating: 4.8,
    reviews: 32,
    isFlashSale: true,
    isNewArrival: false,
    discountBadge: "-34%",
  },
  {
    id: "2",
    name: "10000mAh Magnetic Powerbank (Wireless)",
    slug: "10000mah-magnetic-powerbank",
    description: "Wireless magnetic powerbank for MagSafe compatible devices.",
    price: 10800,
    originalPrice: 15000,
    currency: "NGN",
    image: makeSvgPlaceholder("Magnetic Powerbank"),
    category: "powerbanks",
    rating: 4.5,
    reviews: 28,
    isFlashSale: true,
    isNewArrival: false,
    discountBadge: "-28%",
  },
  {
    id: "3",
    name: "60W Type-C to Type-C Fast Charging Cable",
    slug: "60w-type-c-to-type-c-cable",
    description: "Durable braided fast charging cable.",
    price: 3150,
    originalPrice: 4500,
    currency: "NGN",
    image: makeSvgPlaceholder("Fast Charging Cable"),
    category: "cables",
    rating: 4.9,
    reviews: 45,
    isFlashSale: true,
    isNewArrival: false,
    discountBadge: "-30%",
  },
  {
    id: "4",
    name: "10\" LED Ring Light with Tripod Stand",
    slug: "10-inch-led-ring-light",
    description: "Perfect lighting for content creators.",
    price: 8990,
    originalPrice: 12000,
    currency: "NGN",
    image: makeSvgPlaceholder("LED Ring Light"),
    category: "content-creation",
    rating: 4.6,
    reviews: 61,
    isFlashSale: true,
    isNewArrival: false,
    discountBadge: "-25%",
  },
  {
    id: "5",
    name: "Wireless Lavalier Microphone",
    slug: "wireless-lavalier-microphone",
    description: "Crisp audio recording for mobile devices.",
    price: 6150,
    originalPrice: 9000,
    currency: "NGN",
    image: makeSvgPlaceholder("Lavalier Mic"),
    category: "content-creation",
    rating: 4.7,
    reviews: 22,
    isFlashSale: true,
    isNewArrival: false,
    discountBadge: "-32%",
  },
  {
    id: "101",
    name: "30000mAh Powerbank 65W Fast Charge",
    slug: "30000mah-powerbank-65w",
    description: "Massive capacity powerbank capable of charging laptops.",
    price: 18500,
    currency: "NGN",
    image: makeSvgPlaceholder("30000mAh Powerbank"),
    category: "powerbanks",
    rating: 4.9,
    reviews: 14,
    isFlashSale: false,
    isNewArrival: true,
  },
  {
    id: "102",
    name: "5000mAh Magnetic Powerbank",
    slug: "5000mah-magnetic-powerbank",
    description: "Slim and portable magnetic powerbank.",
    price: 8900,
    currency: "NGN",
    image: makeSvgPlaceholder("5000mAh Magnetic"),
    category: "powerbanks",
    rating: 4.4,
    reviews: 9,
    isFlashSale: false,
    isNewArrival: true,
  },
  {
    id: "103",
    name: "3 in 1 Fast Charging Cable (Type-C, iPhone, Micro)",
    slug: "3-in-1-fast-charging-cable",
    description: "Universal charging cable for all your devices.",
    price: 2900,
    currency: "NGN",
    image: makeSvgPlaceholder("3-in-1 Fast Cable"),
    category: "cables",
    rating: 4.8,
    reviews: 11,
    isFlashSale: false,
    isNewArrival: true,
  },
  {
    id: "104",
    name: "Adjustable Phone Desk Stand",
    slug: "adjustable-phone-desk-stand",
    description: "Sturdy aluminum desk stand for smartphones.",
    price: 3800,
    currency: "NGN",
    image: makeSvgPlaceholder("Phone Desk Stand"),
    category: "phone-accessories",
    rating: 4.5,
    reviews: 7,
    isFlashSale: false,
    isNewArrival: true,
  },
  {
    id: "105",
    name: "True Wireless Earbuds",
    slug: "true-wireless-earbuds",
    description: "High quality audio with long battery life.",
    price: 7900,
    currency: "NGN",
    image: makeSvgPlaceholder("Wireless Earbuds"),
    category: "phone-accessories",
    rating: 4.6,
    reviews: 16,
    isFlashSale: false,
    isNewArrival: true,
  }
];

// Simulated Database Fetching Functions

export async function getFlashSaleProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PRODUCTS.filter((product) => product.isFlashSale);
}

export async function getNewArrivals(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PRODUCTS.filter((product) => product.isNewArrival);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const lowercaseQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter((product) => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PRODUCTS.find((product) => product.slug === slug) || null;
}

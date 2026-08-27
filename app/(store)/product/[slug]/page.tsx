import { getProductBySlug, getNewArrivals } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductClient } from "./ProductClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const pageParams = await params;
  const product = await getProductBySlug(pageParams.slug);
  if (!product) return {};
  
  return {
    title: `${product.name} | OlaYK Enterprise`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Fetch some related products
  const relatedProducts = (await getNewArrivals()).slice(0, 4);

  return (
    <ProductClient product={product} relatedProducts={relatedProducts} />
  );
}

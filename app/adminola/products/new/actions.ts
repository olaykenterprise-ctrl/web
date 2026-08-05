"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const originalPrice = formData.get("original_price") ? Number(formData.get("original_price")) : null;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string; // Main image
  const is_flash_sale = formData.get("is_flash_sale") === "on";
  const is_new_arrival = formData.get("is_new_arrival") === "on";
  const discount_badge = formData.get("discount_badge") as string;
  
  // The rich gallery
  const gallery_images = formData.getAll("gallery_images") as string[];

  // Auto-generate slug from name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    description,
    price,
    original_price: originalPrice,
    category,
    image,
    is_flash_sale,
    is_new_arrival,
    discount_badge: discount_badge || null,
    gallery_images
  });

  if (error) {
    console.error("Failed to insert product", error);
    throw new Error("Failed to add product: " + error.message);
  }

  revalidatePath("/adminola/products");
  revalidatePath("/");
  revalidatePath("/category/[slug]", "page");
  redirect("/adminola/products");
}

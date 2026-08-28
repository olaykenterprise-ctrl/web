"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLandingPage(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const subheading = formData.get("subheading") as string;
  const video_link = formData.get("video_link") as string;
  const cta_link = formData.get("cta_link") as string;
  const category = formData.get("category") as string;
  
  // Get stringified blocks JSON
  const blocksJson = formData.get("blocks") as string || "[]";
  const blocks = JSON.parse(blocksJson);
  
  // Store blocks and category in body_list to avoid requiring a schema migration
  const wrapperJson = JSON.stringify({ category, blocks });
  const body_list = [wrapperJson];
  const photos = [] as string[];
  
  // Auto-generate slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const { error } = await supabase.from("landing_pages").insert({
    slug,
    title,
    subheading,
    body_list,
    photos,
    video_link: video_link || null,
    cta_link: cta_link || null
  });

  if (error) {
    console.error("Failed to insert landing page", error);
    throw new Error("Failed to add landing page: " + error.message);
  }

  revalidatePath("/adminola/landing-pages");
  redirect("/adminola/landing-pages");
}

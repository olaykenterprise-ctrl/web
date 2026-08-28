import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const blocks = [
    {
      id: "headline-1",
      type: "headline",
      data: { 
        text: "The Ultimate Self-Cleaning Flat Mop System",
        backgroundImage: "/uploads/mop-hero.jpg"
      }
    },
    {
      id: "subheadline-1",
      type: "subheadline",
      data: { text: "Say goodbye to dirty hands and wet floors. Double scraper blades squeeze water efficiently!" }
    },
    {
      id: "carousel-1",
      type: "image",
      data: { 
        urls: [
          "/uploads/mop1.jpg",
          "/uploads/mop2.jpg",
          "/uploads/mop3.jpg",
          "/uploads/mop4.jpg",
          "/uploads/mop5.jpg"
        ] 
      }
    },
    {
      id: "button-1",
      type: "button",
      data: { label: "BUY NOW", link: "#checkout-form" }
    },
    {
      id: "body-1",
      type: "body",
      data: { text: "This premium flat mop features a self-cleaning system with double scraper blades to squeeze out excess water effortlessly. Whether you're cleaning walls, windows, corners, baseboards, or under furniture, its versatile design makes every job easy. Plus, it includes 3 washable, reusable microfiber mop pads with stronger absorbency that easily remove dirt and hair without you ever having to touch the mess." }
    },
    {
      id: "list-1",
      type: "list",
      data: { 
        items: [
          "Self-Cleaning System: Wash and dry mop efficiently.",
          "Double Scraper Blades: Squeezes excess water in just a few pulls.",
          "Touch-Less Cleaning: Built-in scraper removes hair and dust effortlessly.",
          "Multiple Uses: Perfect for floors, walls, windows, and tight corners.",
          "Includes 3 Reusable Pads: Stronger absorbent microfiber mop pads."
        ] 
      }
    },
    {
      id: "form-1",
      type: "form",
      data: { 
        productName: "Self-Cleaning Flat Mop System", 
        originalPrice: 30000,
        price: 25000,
        options: [
          { label: "1 Mop + Bucket - N25,000", quantity: 1, price: 25000 },
          { label: "2 Mops + Bucket - N40,000(Enjoy 20% Off)", quantity: 2, price: 40000 },
          { label: "3 Mops + Bucket - N60,000(Enjoy 20% Off)", quantity: 3, price: 60000 },
          { label: "More than 3 (Custom Request)", quantity: 4, price: 80000 }
        ]
      }
    }
  ];

  const wrapperJson = JSON.stringify({ category: "home-appliances", blocks });

  const { error } = await supabase.from("landing_pages")
    .update({
      title: "Self-Cleaning Flat Mop System",
      subheading: "Say goodbye to dirty hands and wet floors.",
      video_link: "",
      cta_link: "#checkout-form",
      body_list: [wrapperJson] // The new wrapper format
    })
    .eq("slug", "self-cleaning-flat-mop");

  if (error) {
    console.error("Error creating landing page:", error);
  } else {
    console.log("Success!");
  }
}

run();

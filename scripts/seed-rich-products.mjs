import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const makeSvgPlaceholder = (text, bg = '%23f3f4f6', color = '%235100ff') => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="${bg}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="${color}">${encodeURIComponent(text)}</text></svg>`;

async function seedRichData() {
  console.log("Fetching all products...");
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("Error fetching products", error);
    return;
  }
  
  for (const product of products) {
    console.log(`Updating product: ${product.name}`);
    
    const updateData = {
      gallery_images: [
        product.image,
        makeSvgPlaceholder(`${product.name} View 2`),
        makeSvgPlaceholder(`${product.name} View 3`),
        makeSvgPlaceholder(`${product.name} View 4`),
      ],
      sold_count: Math.floor(Math.random() * 2000) + 100,
      variants: [
        {
          name: "Capacity",
          options: [
            { value: "10000mAh", price: 8900 },
            { value: "20000mAh", price: 11900 },
            { value: "30000mAh", price: 15900 }
          ]
        },
        {
          name: "Color",
          options: [
            { value: "Black", hex: "#000000" },
            { value: "White", hex: "#ffffff" },
            { value: "Blue", hex: "#3b82f6" },
            { value: "Purple", hex: "#a855f7" }
          ]
        }
      ],
      key_features: [
        { title: "Fast Charging", icon: "Zap", description: "Charge up to 60% in just 30 mins." },
        { title: "Strong Magnetic Hold", icon: "Magnet", description: "Snaps on. Stays on. Charges." },
        { title: "Charge 3 Devices", icon: "BatteryCharging", description: "Power 3 devices at once." },
        { title: "LED Power Display", icon: "Monitor", description: "Smart digital battery indicator." }
      ],
      rich_content: {
        heading: "Power Your Day Without Limits",
        subheading: "Perfect for work, travel, creativity and everyday life.",
        image: makeSvgPlaceholder("Rich Content Lifestyle Banner", "%23e5e7eb", "%23000"),
        audiences: [
          { icon: "GraduationCap", label: "Students" },
          { icon: "Camera", label: "Creators" },
          { icon: "Plane", label: "Travelers" },
          { icon: "Briefcase", label: "Business" }
        ]
      },
      whats_in_the_box: [
        `1x ${product.name}`,
        "1x USB-C Charging Cable",
        "1x User Manual"
      ],
      specifications: {
        "Capacity": "20000mAh",
        "Battery Type": "Li-Polymer",
        "Input (Type-C)": "5V/3A, 9V/2A",
        "Output (Type-C)": "5V/3A, 9V/2.22A, 12V/1.67A",
        "Wireless Output": "15W (Max)",
        "Material": "ABS + PC",
        "Weight": "420g",
        "Dimensions": "142 x 68 x 28 mm"
      }
    };

    const { error: updateError } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', product.id);

    if (updateError) {
      console.error(`Error updating ${product.name}:`, updateError);
    }
  }
  
  console.log("Finished seeding rich data!");
}

seedRichData();

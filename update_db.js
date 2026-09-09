require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const { data } = await supabase.from("landing_pages").select("blocks").eq("slug", "self-cleaning-flat-mop").single();
  if (data) {
    const blocksJson = JSON.stringify(data.blocks);
    let updatedBlocks = blocksJson.replace(/Nationwide Delivery/g, "Nationwide Delivery (POD in Lagos Only)");
    updatedBlocks = updatedBlocks.replace(/Free Nationwide Delivery: Shipped straight to your doorstep with zero shipping fees./g, "Free Nationwide Delivery: Shipped straight to your doorstep (POD available in Lagos).");
    
    await supabase.from("landing_pages").update({ blocks: JSON.parse(updatedBlocks) }).eq("slug", "self-cleaning-flat-mop");
    console.log("Database updated");
  }
})();

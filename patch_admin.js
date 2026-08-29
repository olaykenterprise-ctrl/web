const fs = require('fs');
let code = fs.readFileSync('lib/admin-data.ts', 'utf8');
code = code.replace(
  "export async function getStoreOrders(): Promise<Order[]> {\n  const supabase = await createClient();",
  "import { createClient as createSupabaseClient } from '@supabase/supabase-js';\n\nexport async function getStoreOrders(): Promise<Order[]> {\n  const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);"
);
fs.writeFileSync('lib/admin-data.ts', code);

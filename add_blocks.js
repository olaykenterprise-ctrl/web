const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// To run raw SQL on Supabase via REST, we can't easily do it with standard JS client,
// But we can use the `rpc` function if a function exists, or we can use `pg` if we have connection string.
// Do we have the postgres connection string in .env.local? Let's check.

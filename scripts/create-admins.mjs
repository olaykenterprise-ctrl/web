import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const defaultPassword = 'AdminPassword2026!'; // Default password to use
const emails = ['olaykenterprise@gmail.com', 'itskingezekiel@gmail.com'];

async function createAdmins() {
  for (const email of emails) {
    console.log(`Creating user: ${email}`);
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: defaultPassword,
      email_confirm: true // bypasses email verification
    });

    if (error) {
      if (error.message.includes('already been registered')) {
        console.log(`User ${email} already exists. Updating password to default...`);
        // If they already exist, just update their password so we know they can log in
        const { data: usersData } = await supabase.auth.admin.listUsers();
        const user = usersData.users.find(u => u.email === email);
        if (user) {
          await supabase.auth.admin.updateUserById(user.id, { password: defaultPassword });
          console.log(`Password reset for ${email}.`);
        }
      } else {
        console.error(`Error creating ${email}:`, error.message);
      }
    } else {
      console.log(`Successfully created ${email}!`);
    }
  }
  console.log(`\nDefault password for both accounts is: ${defaultPassword}`);
}

createAdmins();

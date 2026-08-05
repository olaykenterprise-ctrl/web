import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  async function updatePassword(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      throw new Error("Failed to update password: " + error.message);
    }
    
    // In a real app we'd use useFormState for nice success messages,
    // but throwing errors is a quick way to block for now.
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="text" 
              disabled 
              value={user?.email || ""}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-2">Your email address cannot be changed from this dashboard.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
        <form action={updatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              name="password"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

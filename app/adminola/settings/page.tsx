import { createClient } from "@/utils/supabase/server";
import { Shield, Mail, KeyRound } from "lucide-react";

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
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Security & Settings</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage your admin account credentials and platform security.</p>
      </div>

      <div className="space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <Mail size={20} />
            </div>
            Administrator Profile
          </h2>
          <div className="space-y-4 relative z-10">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Registered Email Address</label>
              <input 
                type="text" 
                disabled 
                value={user?.email || ""}
                className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 text-gray-400 font-medium cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 font-medium mt-2">For security reasons, your admin email address cannot be changed from this dashboard. Contact support if you need to transfer ownership.</p>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
              <KeyRound size={20} />
            </div>
            Change Password
          </h2>
          <form action={updatePassword} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">New Password</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  minLength={6}
                  className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:bg-white transition-all text-gray-900 font-medium"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="w-full bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:bg-white transition-all text-gray-900 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:-translate-y-1"
              >
                <Shield size={18} />
                Update Secure Password
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

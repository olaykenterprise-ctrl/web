export const dynamic = "force-dynamic";

import { createClient } from "@/utils/supabase/server";
import { Shield, Mail, KeyRound, Lock } from "lucide-react";

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
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Security & Preferences</h1>
        <p className="text-xs font-medium text-gray-500 mt-1">Manage your admin access credentials and dashboard preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00875A] flex items-center justify-center">
              <Mail size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Administrator Profile</h3>
              <p className="text-[11px] text-gray-400">Authenticated user account</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Admin Email Address
              </label>
              <input
                type="text"
                disabled
                value={user?.email || "admin@company.com"}
                className="w-full bg-[#F4F7FB] px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-xs font-medium cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Your email is used to log in and receive notifications. Contact super admin to modify.
            </p>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <KeyRound size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Change Password</h3>
              <p className="text-[11px] text-gray-400">Update your access password</p>
            </div>
          </div>

          <form action={updatePassword} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                New Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-[#F4F7FB] focus:bg-white px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 text-xs text-gray-900 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-[#F4F7FB] focus:bg-white px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 text-xs text-gray-900 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00875A] hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              <Shield size={14} /> Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import { createClient } from "@/utils/supabase/client";
import { LogIn, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/adminola");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex font-sans">
      
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#FFC107] blur-[150px] opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-orange-500 blur-[150px] opacity-20"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tighter">
            ADMIN<span className="text-[#FFC107]">OLA</span>
          </h2>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Manage your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-orange-400">
              empire.
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Welcome back to the command center. Control your inventory, generate powerful landing pages, and track your metrics from one central hub.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        {/* Mobile Background Elements */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FFC107] blur-[100px] opacity-20"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          
          <div className="lg:hidden mb-12 text-center">
            <h2 className="text-4xl font-black text-white tracking-tighter">
              ADMIN<span className="text-[#FFC107]">OLA</span>
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">Sign in to your account</h2>
              <p className="text-gray-400 text-sm">Enter your secure admin credentials to continue.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm mb-8 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all placeholder:text-gray-600"
                  placeholder="admin@olaykenterprise.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  required
                  className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-[#FFC107] to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-gray-950 font-black py-4 px-6 rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(255,193,7,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,193,7,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
              >
                {loading ? (
                  <span className="w-6 h-6 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    Sign In Securely
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

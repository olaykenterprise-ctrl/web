"use client";

import { createClient } from "@/utils/supabase/client";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-[#0B1320] flex font-sans antialiased text-gray-100">
      
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-[#0B1320] via-[#0F172A] to-[#0A0F1D]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#10B981] blur-[160px] opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-[#00875A] blur-[150px] opacity-20"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00875A] flex items-center justify-center text-white shadow-md shadow-[#00875A]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AdminPanel</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
            <Sparkles size={13} /> Secure Portal
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Welcome to the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Admin Command Center.
            </span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Monitor real-time sales, fulfill customer orders, manage product inventories, and launch promotional marketing campaigns.
          </p>
        </div>

        <div className="relative z-10 text-xs text-gray-500">
          © 2026 OlaYK Enterprise. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 z-0 lg:hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#10B981] blur-[100px] opacity-20"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          
          <div className="lg:hidden mb-8 text-center flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00875A] flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              AdminPanel
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1.5">Sign in to your account</h2>
              <p className="text-gray-400 text-xs">Enter your administrator credentials to proceed.</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs mb-6 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="email" 
                    name="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-600"
                    placeholder="olaykenterprise@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="password" 
                    name="password" 
                    required
                    className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-[#00875A] hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-all shadow-lg shadow-[#00875A]/25 disabled:opacity-50 group flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    Sign In Securely
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

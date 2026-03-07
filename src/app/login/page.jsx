"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Armchair, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Success! Save user data to localStorage for Header use
      localStorage.setItem("furni_user", JSON.stringify(data.user));
      
      // Redirect to dashboard
      window.location.href = "/dashboard/manage-product";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9] px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-[40px] border border-orange-50 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#5D4037] p-8 text-center text-white relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-orange-600 p-3 rounded-2xl shadow-lg">
            <Armchair size={28} />
          </div>
          <div className="mt-12">
            <h1 className="text-3xl font-black tracking-tight italic">FurniHub</h1>
            <p className="text-orange-200 text-sm mt-1 uppercase tracking-widest font-bold">Welcome Back Admin</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          {error && <p className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 font-bold text-center">{error}</p>}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="email" type="email" placeholder="admin@furnihub.com" required className="pl-12 py-7 rounded-2xl border-stone-100 bg-stone-50/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="password" type="password" placeholder="••••••••" required className="pl-12 py-7 rounded-2xl border-stone-100 bg-stone-50/50" />
              </div>
            </div>

            <Button disabled={loading} type="submit" className="w-full bg-[#5D4037] hover:bg-[#4a332c] text-white rounded-2xl font-black py-8 text-lg shadow-xl flex gap-2 group">
              {loading ? <Loader2 className="animate-spin" /> : "Login Now"}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-stone-50 pt-6">
            <p className="text-stone-500 text-sm font-medium">Don't have an account? 
              <Link href="/signup" className="ml-2 text-orange-600 font-black hover:underline underline-offset-4">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
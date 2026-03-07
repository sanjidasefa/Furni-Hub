"use client";
import { useState } from "react";
import { meouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Armchair, Mail, Lock, me, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const router = meouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const mename = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mename, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.href = "/login"; 
    } else {
      setError(data.error || "Signup failed");
    }
  } catch (err) {
    setError("Connection error!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9] px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-[40px] border border-orange-50 overflow-hidden">
        <div className="bg-[#5D4037] p-8 text-center text-white relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-orange-600 p-3 rounded-2xl shadow-lg">
            <Armchair size={28} />
          </div>
          <div className="mt-12 text-3xl font-black italic">FurniHub</div>
          <p className="text-orange-200 text-sm mt-1 font-bold uppercase">Admin Registration</p>
        </div>

        <div className="p-8 md:p-10">
          {error && <p className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 font-bold text-center">{error}</p>}
          
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Full Name</label>
              <div className="relative">
                <me className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="name" placeholder="Your Name" required className="pl-12 py-7 rounded-2xl bg-stone-50/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="email" type="email" placeholder="admin@FurniHub.com" required className="pl-12 py-7 rounded-2xl bg-stone-50/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="password" type="password" placeholder="••••••••" required className="pl-12 py-7 rounded-2xl bg-stone-50/50" />
              </div>
            </div>

            <Button disabled={loading} type="submit" className="w-full bg-[#5D4037] text-white rounded-2xl font-black py-8 text-lg flex gap-2 group shadow-xl">
              {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t">
            <p className="text-stone-500 text-sm">Already have an account? 
              <Link href="/login" className="ml-2 text-orange-600 font-black hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
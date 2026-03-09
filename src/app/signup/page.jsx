"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Armchair, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"; // 'me' এর বদলে 'User' ইম্পোর্ট করা হয়েছে
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast"; 
export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // --- Validation Logic ---
    if (name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully! Logging you in...");
        const result = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
        if (result?.error) {
          toast.error("Signup successful but auto-login failed. Please login manually.");
          router.push("/login");
        } else {
          setTimeout(() => {
            router.push("/dashboard/manage-product");
          }, 1500);
        }
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      toast.error("Connection error! Please check your internet.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9] px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white shadow-2xl rounded-[40px] border border-orange-50 overflow-hidden">
        <div className="bg-[#5D4037] p-8 text-center text-white relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-orange-600 p-3 rounded-2xl shadow-lg">
            <Armchair size={28} />
          </div>
          <div className="mt-12 text-3xl font-black italic">FurniHub</div>
          <p className="text-orange-200 text-sm mt-1 font-bold uppercase">Admin Registration</p>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="name" placeholder="Enter your full name" required className="pl-12 py-7 rounded-2xl bg-stone-50/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="email" type="email" placeholder="admin@furnihub.com" required className="pl-12 py-7 rounded-2xl bg-stone-50/50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input name="password" type="password" placeholder="Min. 6 characters" required className="pl-12 py-7 rounded-2xl bg-stone-50/50" />
              </div>
            </div>

            <Button disabled={loading} type="submit" className="w-full bg-[#5D4037] hover:bg-[#4a332c] text-white rounded-2xl font-black py-8 text-lg flex gap-2 group shadow-xl transition-all">
              {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t">
            <p className="text-stone-500 text-sm">Already have an account? 
              <Link href="/login" className="ml-2 text-orange-600 font-black hover:underline">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
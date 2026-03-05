"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    // Step A: Save data to localStorage
    const userData = { email, isLoggedIn: true };
    localStorage.setItem("furni_user", JSON.stringify(userData));
    
    // Step B: Set a dummy cookie for middleware (if any)
    document.cookie = "token=true; path=/";

    // Step C: Force Refresh and Redirect
    // router.push-er cheye window.location beshi karkori ekhane
    window.location.href = "/dashboard/create-product";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
      <form onSubmit={handleLogin} className="p-10 bg-white shadow-xl rounded-3xl border border-orange-100 space-y-4 w-96">
        <h2 className="text-2xl font-black text-[#5D4037] text-center">Admin Login</h2>
        <Input name="email" type="email" placeholder="Email" required className="rounded-xl" />
        <Input name="password" type="password" placeholder="Password" required className="rounded-xl" />
        <Button type="submit" className="w-full bg-[#5D4037] rounded-xl font-bold py-6">Login Now</Button>
      </form>
    </div>
  );
}
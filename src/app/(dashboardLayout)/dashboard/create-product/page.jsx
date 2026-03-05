"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check user from localStorage
    const savedUser = localStorage.getItem("furni_user");
    
    if (!savedUser) {
        // Jodi user na thake, tobe login-e pathabe
        router.replace("/login");
    } else {
        // User pawa gele content dekhabe
        setIsAuthorized(true);
    }
  }, [router]);

  // Content render korar age check kora
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
        <p className="mt-4 text-[#5D4037] font-bold tracking-widest">VERIFYING...</p>
      </div>
    );
  }

  return (
    <div className="p-20 text-center">
      <h1 className="text-4xl font-black text-[#5D4037]">Add Furniture Page</h1>
      <p className="text-orange-600 mt-2 font-bold uppercase tracking-tighter">Authorized Access Only</p>
      
      {/* Form Design Ekhane */}
      <div className="mt-10 max-w-md mx-auto p-10 bg-white border border-orange-100 rounded-[2rem] shadow-lg">
          <p className="text-stone-500 italic mb-4">Design your product form here...</p>
          <div className="h-40 bg-orange-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-orange-200 text-orange-400">
             Form Placeholder
          </div>
      </div>
    </div>
  );
}
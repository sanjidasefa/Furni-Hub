"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/service/getAuthUser";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getAuthUser();
    if (!user) {
      // User na thakle login page-e pathabe
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
        <p className="mt-4 text-[#5D4037] font-bold">Checking access...</p>
      </div>
    );
  }

  return children;
}
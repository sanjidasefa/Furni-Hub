"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
        <p className="mt-4 text-[#5D4037] font-bold tracking-widest uppercase text-xs">
          Checking access...
        </p>
      </div>
    );
  }
  if (status === "authenticated") {
    return children;
  }

  return null;
}
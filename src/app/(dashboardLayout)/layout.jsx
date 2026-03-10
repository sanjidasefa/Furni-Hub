// app/dashboard/layout.jsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  if (status === "loading") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
        <p className="text-[#5D4037] font-bold animate-pulse uppercase tracking-widest text-sm">
          Checking permission...
        </p>
      </div>
    );
  }
  if (!session) return null;

  return <>{children}</>;
}
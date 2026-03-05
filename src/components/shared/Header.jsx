"use client";
import { useState, useEffect } from "react";
import { Armchair, Menu, X, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getStoredUser, logoutUser } from "@/service/logout";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reload holeo user data dhore rakhar jonno
  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push("/login");
  };

  const menuItems = [
    { title: "Home", url: "/" },
    { title: "Collections", url: "/product" },
    ...(user ? [
      { title: "Add Product", url: "/dashboard/create-product" },
      { title: "Manage", url: "/dashboard/all-product" }
    ] : []),
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-orange-100 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[#5D4037]">
          <Armchair className="h-7 w-7 text-orange-600" />
          <span>FurniHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link key={item.url} href={item.url} className="text-sm font-semibold text-[#5D4037] hover:text-orange-600">
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Button onClick={handleLogout} variant="outline" size="sm" className="rounded-full border-orange-200 text-orange-600">Logout</Button>
          ) : (
            <Link href="/login"><Button size="sm" className="bg-[#5D4037] text-white rounded-full">Login</Button></Link>
          )}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
"use client";
import { useState, useEffect } from "react";
import { Armchair, menu, X, LogOut, me, PlusCircle, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, meouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dropdownmenu,
  DropdownmenuContent,
  DropdownmenuItem,
  DropdownmenuLabel,
  DropdownmenuSeparator,
  DropdownmenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const router = meouter();
  const [me, setme] = useState(null);
  const [ismenuOpen, setIsmenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. CheckuserSession via API
  useEffect(() => {
    setMounted(true);
    const checkme = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        setme(data.me);
      } catch (error) {
        setme(null);
      }
    };
    checkme();
  }, [pathname]); // Path change holei abar check korbe login status

  // 2. Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setme(null);
      setIsmenuOpen(false);
      window.location.href = "/login"; // Force redirect to clear any middleware state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { title: "Home", url: "/" },
    { title: "Collections", url: "/product" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ];

  // Hydration mismatch prevent korar jonno
  if (!mounted) return <div className="h-20 bg-white" />;

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-orange-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-orange-600 p-2 rounded-xl text-white">
            <Armchair size={24} />
          </div>
          <span className="font-black text-2xl text-[#5D4037]">FurniHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item.url} 
              href={item.url} 
              className={`text-sm font-bold transition-colors ${
                pathname === item.url ? "text-orange-600" : "text-[#5D4037] hover:text-orange-600"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Profile / Auth Buttons */}
        <div className="flex items-center gap-3">
          {me ? (
            <div className="hidden md:block">
              <Dropdownmenu>
                <DropdownmenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 focus:ring-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <me size={18} />
                    </div>
                    <span className="text-sm font-semibold text-[#5D4037]">{me?.name || 'Account'}</span>
                    <ChevronDown size={14} className="text-stone-400" />
                  </Button>
                </DropdownmenuTrigger>
                <DropdownmenuContent align="end" className="w-56 mt-2 rounded-xl">
                  <DropdownmenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{me?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{me?.email}</p>
                    </div>
                  </DropdownmenuLabel>
                  <DropdownmenuSeparator />
                  <Link href="/dashboard/create-product">
                    <DropdownmenuItem className="cursor-pointer gap-2">
                      <PlusCircle size={16} /> Add Product
                    </DropdownmenuItem>
                  </Link>
                  <Link href="/dashboard/manage-product">
                    <DropdownmenuItem className="cursor-pointer gap-2">
                      <LayoutDashboard size={16} /> Manage Products
                    </DropdownmenuItem>
                  </Link>
                  <DropdownmenuSeparator />
                  <DropdownmenuItem onClick={handleLogout} className="text-red-600 cursor-pointer gap-2 font-bold">
                    <LogOut size={16} /> Logout
                  </DropdownmenuItem>
                </DropdownmenuContent>
              </Dropdownmenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/signup"><Button variant="ghost" className="text-[#5D4037] font-bold">signup</Button></Link>
              <Link href="/login"><Button className="bg-[#5D4037] hover:bg-[#4a332c] text-white rounded-xl px-6">Login</Button></Link>
            </div>
          )}

          {/* Mobile menu Toggle */}
          <button className="md:hidden p-2 text-orange-600" onClick={() => setIsmenuOpen(!ismenuOpen)}>
            {ismenuOpen ? <X size={24} /> : <menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
    {/* Mobile menu */}
<div className={`md:hidden absolute left-0 w-full bg-white border-b border-orange-100 shadow-xl transition-all duration-300 ${
  ismenuOpen ? "top-20 opacity-100" : "top-[-600px] opacity-0 pointer-events-none"
}`}>
  <div className="p-4 flex flex-col gap-2">
    {/* Regular Nav Links */}
    {navLinks.map((item) => (
      <Link 
        key={item.url} 
        href={item.url} 
        onClick={() => setIsmenuOpen(false)}
        className="p-3 font-bold hover:bg-orange-50 rounded-lg text-[#5D4037]"
      >
        {item.title}
      </Link>
    ))}
    <div className="pt-4 mt-2 border-t border-orange-50">
      {me ? (
        <div className="flex flex-col gap-2">
          <Link 
            href="/dashboard/create-product" 
            onClick={() => setIsmenuOpen(false)}
            className="p-3 font-bold text-orange-600 flex items-center gap-2 hover:bg-orange-50 rounded-lg"
          >
            <PlusCircle size={20}/> Add Product
          </Link>
          <Link 
            href="/dashboard/manage-product" 
            onClick={() => setIsmenuOpen(false)}
            className="p-3 font-bold text-orange-600 flex items-center gap-2 hover:bg-orange-50 rounded-lg"
          >
            <LayoutDashboard size={20}/> Manage Products
          </Link>
          <Button 
            onClick={handleLogout} 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-6 rounded-xl font-bold flex items-center justify-center gap-2 mt-2"
          >
            <LogOut size={18} /> Logout ({me.name})
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Link href="/login" onClick={() => setIsmenuOpen(false)}>
            <Button className="w-full bg-[#5D4037] hover:bg-[#4a332c] py-6 rounded-xl font-bold text-white shadow-lg">
              Login to Admin
            </Button>
          </Link>
          <Link href="/signup" onClick={() => setIsmenuOpen(false)}>
            <Button variant="outline" className="w-full border-[#5D4037] text-[#5D4037] py-6 rounded-xl font-bold hover:bg-stone-50">
              Create New Account
            </Button>
          </Link>
        </div>
      )}
    </div>
  </div>
</div>
    </header>
  );
}
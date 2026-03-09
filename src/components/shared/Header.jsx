"use client";

import { useState, useEffect } from "react";
import { 
  Armchair, Menu, X, LogOut, User, 
  PlusCircle, LayoutDashboard, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { title: "Home", url: "/" },
    { title: "Collections", url: "/product" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Testimonials", url: "/testimonials" },
    { title: "create-product", url: "/dashboard/create-product" },
  ];

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

        {/* Desktop Navigation */}
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

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 focus-visible:ring-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <User size={18} />
                    </div>
                    <span className="text-sm font-semibold text-[#5D4037]">
                      {session.user?.name || 'Account'}
                    </span>
                    <ChevronDown size={14} className="text-stone-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/create-product" className="cursor-pointer flex items-center gap-2 w-full">
                      <PlusCircle size={16} /> Add Product
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/manage-product" className="cursor-pointer flex items-center gap-2 w-full">
                      <LayoutDashboard size={16} /> Manage Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: "/login" })} 
                    className="text-red-600 cursor-pointer gap-2 font-bold focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/signup"><Button variant="ghost" className="text-[#5D4037] font-bold">Signup</Button></Link>
              <Link href="/login"><Button className="bg-[#5D4037] hover:bg-[#4a332c] text-white rounded-xl px-6">Login</Button></Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-orange-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute left-0 w-full bg-white border-b border-orange-100 shadow-xl transition-all duration-300 ${
        isMenuOpen ? "top-20 opacity-100" : "top-[-600px] opacity-0 pointer-events-none"
      }`}>
        <div className="p-4 flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link 
              key={item.url} 
              href={item.url} 
              onClick={() => setIsMenuOpen(false)}
              className="p-3 font-bold hover:bg-orange-50 rounded-lg text-[#5D4037]"
            >
              {item.title}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-orange-50">
            {session ? (
              <div className="flex flex-col gap-2">
                <Link href="/dashboard/create-product" onClick={() => setIsMenuOpen(false)} className="p-3 font-bold text-orange-600 flex items-center gap-2 hover:bg-orange-50 rounded-lg">
                  <PlusCircle size={20}/> Add Product
                </Link>
                <Link href="/dashboard/manage-product" onClick={() => setIsMenuOpen(false)} className="p-3 font-bold text-orange-600 flex items-center gap-2 hover:bg-orange-50 rounded-lg">
                  <LayoutDashboard size={20}/> Manage Products
                </Link>
                <Button 
                  onClick={() => signOut({ callbackUrl: "/login" })} 
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-6 rounded-xl font-bold flex items-center justify-center gap-2 mt-2"
                >
                  <LogOut size={18} /> Logout ({session.user?.name})
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#5D4037] hover:bg-[#4a332c] py-6 rounded-xl font-bold text-white">Login to Admin</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#5D4037] text-[#5D4037] py-6 rounded-xl font-bold">Create New Account</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
"use client";
import { useState, useEffect } from "react";
import { Armchair, Menu, X, LogOut, User, PlusCircle, LayoutDashboard, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getStoredUser, logoutUser } from "@/service/logout";
// Assuming you have shadcn dropdown-menu components
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
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.location.href = "/login";
  };

  // 4+ Core Routes
  const navLinks = [
    { title: "Home", url: "/" },
    { title: "Collections", url: "/product" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
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

        {/* Action Buttons & Dropdown */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 focus:ring-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <User size={18} />
                    </div>
                    <span className="text-sm font-semibold text-[#5D4037]">{user?.name || 'My Account'}</span>
                    <ChevronDown size={14} className="text-stone-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard/create-product">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <PlusCircle size={16} /> Add Product
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/all-product">
                    <DropdownMenuItem className="cursor-pointer gap-2">
                      <LayoutDashboard size={16} /> Manage Products
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer gap-2">
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/register">
                <Button variant="ghost" className="text-[#5D4037] font-bold">Register</Button>
              </Link>
              <Link href="/login">
                <Button className="bg-[#5D4037] hover:bg-[#4a332c] text-white rounded-xl px-6">Login</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 bg-orange-50 rounded-lg text-orange-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div 
        className={`md:hidden absolute left-0 w-full bg-white border-b border-orange-100 shadow-xl transition-all duration-300 ${
          isMenuOpen ? "top-20 opacity-100" : "top-[-500px] opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link key={item.url} href={item.url} className="p-3 font-bold hover:bg-orange-50 rounded-lg">
              {item.title}
            </Link>
          ))}
          
          {user && (
            <>
              <div className="h-[1px] bg-orange-100 my-2" />
              <Link href="/dashboard/create-product" className="p-3 font-bold text-orange-600 flex gap-2"><PlusCircle size={20}/> Add Product</Link>
              <Link href="/dashboard/all-product" className="p-3 font-bold text-orange-600 flex gap-2"><LayoutDashboard size={20}/> Manage Products</Link>
            </>
          )}

          <div className="pt-4 mt-2 border-t border-orange-50">
            {user ? (
              <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-6 rounded-xl font-bold gap-2">
                <LogOut size={18} /> Logout ({user.email})
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                 <Link href="/login"><Button className="w-full bg-[#5D4037] py-6 rounded-xl">Login</Button></Link>
                 <Link href="/register"><Button variant="outline" className="w-full py-6 rounded-xl">Register</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FeaturesSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Received non-JSON response:", text);
        throw new TypeError("Oops, we didn't get JSON from the server!");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="h-10 w-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
        <p className="text-[#5D4037] font-medium animate-pulse">Crafting your collection...</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#FDFBF9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">
            Handpicked for you
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#5D4037]">
            Featured Collections
          </h2>
          <div className="h-1 w-20 bg-orange-200 mt-4 rounded-full" />
        </div>

        {/* Product Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[2rem] shadow-xl shadow-orange-900/5 overflow-hidden border border-orange-50 hover:border-orange-200 transition-all duration-500 relative"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder-furniture.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                
                {/* Price Tag Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                  <span className="text-orange-600 font-bold text-lg">{item.price || "$299"}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
                    ))}
                    <span className="text-xs text-stone-400 ml-2">(4.9)</span>
                </div>

                <h3 className="text-2xl font-bold text-[#5D4037] group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-stone-500 mt-2 font-medium">
                  {item.category || "Solid Wood Collection"}
                </p>
                
                <p className="mt-4 text-stone-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-orange-200 text-[#5D4037] hover:bg-orange-50 hover:text-orange-700 rounded-xl h-12 transition-all"
                  >
                    <Eye size={18} className="mr-2" /> Details
                  </Button>
                  
                  <Button
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 shadow-lg shadow-orange-200"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Link */}
        <div className="flex justify-center mt-16">
          <Link href="/shop">
            <Button variant="ghost" className="text-[#5D4037] font-bold text-lg hover:text-orange-600 group">
              Browse All Products 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
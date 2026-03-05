"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Star, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/all-product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#5D4037]">Our Collection</h1>
            <p className="text-stone-500 mt-2 text-lg">
              Explore our premium, sustainably sourced wood furniture.
            </p>
          </div>
          
          <Button variant="outline" className="border-orange-200 text-[#5D4037] rounded-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter By
          </Button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-stone-200 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-stone-200 mb-4 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-stone-400 font-medium">No Image</div>
                  )}
                  
                  {/* Floating Action Button */}
                  <Button className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#5D4037] hover:bg-orange-600 hover:text-white rounded-full p-4 h-12 w-12 shadow-xl translate-y-4 group-hover:translate-y-0 duration-300">
                    <ShoppingBag size={20} />
                  </Button>
                </div>

                {/* Details */}
                <div className="px-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} className="fill-orange-400 text-orange-400" />
                    <span className="text-xs text-stone-500 font-bold">4.8</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#5D4037] mb-1 group-hover:text-orange-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-lg font-black text-orange-700">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
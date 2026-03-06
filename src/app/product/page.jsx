"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Star, Search, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Living Room", "Bedroom", "Office", "Dining"];

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/all-product");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.priority === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-4">
            Our Premium Collection
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg italic">
            Handcrafted furniture designed to bring warmth and elegance to your home.
          </p>
        </div>

        {/* --- SEARCH & FILTER UI --- */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-16 bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <Input 
              placeholder="Search furniture by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-full border-orange-100 focus-visible:ring-orange-200"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 transition-all ${
                  activeCategory === cat 
                  ? "bg-orange-600 hover:bg-orange-700 text-white" 
                  : "border-orange-100 text-[#5D4037] hover:bg-orange-50"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-orange-600 animate-spin mb-4" />
            <p className="text-stone-400 font-bold uppercase tracking-widest">Loading Furnitures...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="group flex flex-col h-full bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-orange-50">
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-stone-100 mb-6">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-300">
                        <ShoppingBag size={48} />
                      </div>
                    )}
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-orange-700 uppercase tracking-widest shadow-sm">
                      {product.priority || "Standard"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-[#5D4037] group-hover:text-orange-600 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                        <Star size={14} className="fill-orange-400 text-orange-400" />
                        <span className="text-xs font-bold text-orange-700">4.9</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 italic">
                      {product.shortDescription || "A beautiful handcrafted piece for your home decor."}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-orange-50">
                      <div>
                        <span className="text-xs text-stone-400 block uppercase font-bold tracking-tighter">Price</span>
                        <span className="text-2xl font-black text-[#5D4037]">${product.price}</span>
                      </div>

                      <Link href={`/product/${product._id}`}>
                        <Button variant="ghost" className="rounded-full hover:bg-orange-600 hover:text-white group/btn gap-2 font-bold transition-all">
                          Details
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-orange-100">
                <p className="text-stone-400 text-xl font-medium">No products found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                  className="text-orange-600 font-bold"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
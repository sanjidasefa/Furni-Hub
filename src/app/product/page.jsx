"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, PackageOpen } from "lucide-react";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#FDFBF9]">
      <Loader2 className="animate-spin text-orange-600" size={40} />
      <span className="ml-3 font-bold text-[#5D4037]">Loading Gallery...</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#FDFBF9] min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-[#5D4037] mb-2">Our Collection</h1>
        <p className="text-orange-600 font-medium">Total: {products.length} Premium Pieces</p>
      </header>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((item) => (
            <div key={item._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-orange-50 p-4">
              <div className="relative h-72 w-full rounded-[1.5rem] overflow-hidden mb-5 bg-stone-100">
                <Image 
                  src={item.imageUrl || "https://via.placeholder.com/400x500"} 
                  alt={item.title || "Furniture"} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-2">
                <h2 className="text-2xl font-bold text-[#5D4037] mb-1">{item.title}</h2>
                <p className="text-stone-500 text-sm line-clamp-2 mb-4 italic">{item.shortDescription}</p>
                <div className="flex justify-between items-center pt-4 border-t border-orange-50">
                  <span className="text-2xl font-black text-orange-600">${item.price}</span>
                  <span className="bg-[#5D4037] text-white px-4 py-1 rounded-full text-xs font-bold">
                    {item.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-orange-200">
          <PackageOpen size={64} className="text-orange-200 mb-4" />
          <p className="text-stone-400 text-xl font-bold italic">No products found in DB.</p>
          <p className="text-xs text-stone-300 mt-2">Check MongoDB Atlas for 'product-collection'</p>
        </div>
      )}
    </div>
  );
}
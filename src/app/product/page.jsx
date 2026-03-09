"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Loader2, PackageOpen, Search } from "lucide-react";
import Link from "next/link";

// এখানে 'limit' প্রপসটি রিসিভ করা হচ্ছে
export default function ProductListingPage({ limit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const filteredItems = useMemo(() => {
    let result = [...products];
    if (search)
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );
    
    if (category !== "All")
      result = result.filter((p) => p.priority?.toLowerCase() === category.toLowerCase());
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price)
    return limit ? result.slice(0, limit) : result;
  }, [products, search, category, sort, limit]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-orange-600" size={32} />
      </div>
    );

  return (
    <div className={`max-w-7xl mx-auto px-6 ${!limit && 'py-10 bg-[#FDFBF9] min-h-screen'}`}>
      {!limit && (
        <>
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-black text-[#5D4037] tracking-tight">
              Furni<span className="text-orange-600 ml-2">Hub</span> Collection
            </h1>
           <p className="text-stone-400 mt-2">Carefully curated pieces for your home.</p>
          </header>

          <div className="sticky top-4 z-30 mb-10 flex flex-wrap gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-stone-100">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 outline-none text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-stone-50 px-3 py-2 rounded-xl outline-none text-xs font-bold text-stone-600 cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="High">Premium</option>
              <option value="Low">Classic</option>
            </select>
            <select
              className="bg-stone-50 px-3 py-2 rounded-xl outline-none text-xs font-bold text-stone-600 cursor-pointer"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low-High</option>
              <option value="high">Price: High-Low</option>
            </select>
          </div>
        </>
      )}

      {/* Product Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500"
            >
              <div className="relative h-72 m-3 rounded-[2rem] overflow-hidden">
                <Image
                  src={item.imageUrl || "https://via.placeholder.com/400"}
                  alt={item.title || "Product Image"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.priority === "High" ? "bg-orange-600 text-white" : "bg-white/90 backdrop-blur-md text-stone-800 shadow-sm"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>

              <div className="p-8 pt-4">
                <h2 className="text-xl font-bold text-[#5D4037] group-hover:text-orange-600 transition-colors">{item.title}</h2>
                
                {/* Short Description - Visible and clean */}
                <p className="text-stone-500 text-sm mt-3 leading-relaxed line-clamp-2 min-h-[40px]">
                  {item.shortDescription}
                </p>

                <div className="flex justify-between items-center mt-8 pt-5 border-t border-stone-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Price</span>
                    <span className="text-2xl font-black text-[#5D4037]">${item.price}</span>
                  </div>
                  <Link href={`/product/${item._id}`}>
                    <button className="bg-[#5D4037] text-white hover:bg-orange-600 px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#5D4037]/10 active:scale-95">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-stone-200">
          <PackageOpen size={64} className="mx-auto text-stone-100 mb-4" />
          <p className="text-stone-400 font-medium">No items found in this collection.</p>
        </div>
      )}
    </div>
  );
}
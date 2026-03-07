"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Loader2, PackageOpen, Search } from "lucide-react";
import Link from "next/link";
export default function ProductListingPage() {
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
        console.error(err);
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
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    if (category !== "All")
      result = result.filter((p) => p.priority === category);
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, search, category, sort]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="animate-spin text-orange-600" size={40} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-[#FDFBF9] min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-[#5D4037] tracking-tight">
          Furni<span className="text-orange-600">Hub</span>
        </h1>
      </header>

      {/* Control Bar */}
      <div className="sticky top-4 z-30 mb-10 flex flex-wrap gap-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-stone-100">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            size={16}
          />
          <input
            placeholder="Search..."
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
          <option value="Medium">Modern</option>
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

      {/* Product Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 hover:shadow-xl transition-all"
            >
              <div className="relative h-64 m-2 rounded-[1.8rem] overflow-hidden">
                <Image
                  src={item.imageUrl || "https://via.placeholder.com/400"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${item.priority === "High" ? "bg-orange-600 text-white" : "bg-white text-stone-800 shadow-sm"}`}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-[#5D4037] truncate">
                  {item.title}
                </h2>
                <p className="text-stone-400 text-xs mt-1 mb-4 line-clamp-1">
                  {item.shortDescription}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                  <span className="text-2xl font-black text-[#5D4037]">
                    ${item.price}
                  </span>
                  <Link href={`/product/${item._id}`}>
                    <button className="bg-stone-100 text-[#5D4037] hover:bg-orange-600 hover:text-white px-5 py-2 rounded-lg text-xs font-bold transition-all">
                      View Details ..
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-stone-100">
          <PackageOpen size={48} className="mx-auto text-stone-200 mb-3" />
          <p className="text-stone-400 font-medium text-sm">
            No furniture matches your filter.
          </p>
        </div>
      )}
    </div>
  );
}

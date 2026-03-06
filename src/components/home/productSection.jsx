import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import Image from "next/image"; // Next.js Image use kora bhalo
import Link from "next/link";

const products = [
  { id: 1, name: "Nordic Oak Dining Chair", price: "$120", category: "Dining", badge: "New", rating: 4.8 },
  { id: 2, name: "Velvet Luxe Sofa", price: "$850", category: "Living Room", badge: "Hot", rating: 4.9 },
  { id: 3, name: "Minimalist Coffee Table", price: "$210", category: "Office", badge: "Sale", rating: 4.5 },
  { id: 4, name: "Rustic Pine Bed Frame", price: "$540", category: "Bedroom", badge: null, rating: 4.7 },
  { id: 5, name: "Modern Office Desk", price: "$320", category: "Office", badge: "New", rating: 4.6 },
  { id: 6, name: "Classic Wooden Bookshelf", price: "$450", category: "Decor", badge: null, rating: 4.8 },
];

export default function ProductSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between border-b border-orange-100 pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#5D4037]">
              Our Best Sellers
            </h2>
            <p className="mt-3 text-stone-500 max-w-md">
              Explore our most-loved furniture pieces, hand-crafted with premium solid wood.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex border-orange-200 text-orange-700 hover:bg-orange-50 rounded-full px-6">
            View All Products
          </Button>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl border border-transparent bg-[#FDFBF9] p-2 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-300"
            >
              {/* Product Image Holder */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200">
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {product.badge}
                  </span>
                )}
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-stone-400 hover:text-red-500 backdrop-blur-sm transition-colors shadow-sm">
                  <Heart size={18} />
                </button>

                {/* Placeholder or Image */}
                <div className="h-full w-full bg-[#EAE3DC] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                   <span className="text-stone-400">Furniture Image</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4 pt-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <Star size={12} className="fill-orange-400 text-orange-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#5D4037] group-hover:text-orange-700 transition-colors truncate">
                  {product.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-black text-[#5D4037]">
                    {product.price}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-200"
                  >
                    <ShoppingCart size={16} className="mr-2" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden">
            <Button className="w-full bg-orange-50 text-orange-700 hover:bg-orange-100 py-6 font-semibold">
              <Link href='/product'> View All Products</Link> 
            </Button>
        </div>
      </div>
    </section>
  );
}
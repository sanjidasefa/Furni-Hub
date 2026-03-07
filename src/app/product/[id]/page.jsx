"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Calendar,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
  async function fetchProduct() {
    try {
      // Direct dynamic API call
      const res = await fetch(`/api/product/${id}`);
      
      if (!res.ok) throw new Error("Product not found");
      
      const data = await res.json();
      setProduct(data); 
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }
  if (id) fetchProduct();
}, [id]);
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
      <div className="h-12 w-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-[#5D4037] gap-4">
      <h2 className="text-2xl font-bold">Product Not Found</h2>
      <Link href="/product">
        <Button className="bg-orange-600">Return to Collection</Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF9] pb-20">
      {/* --- BACK BUTTON --- */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link href="/product" className="inline-flex items-center text-stone-500 hover:text-orange-600 transition-colors group font-bold">
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" /> 
          Back to Collection
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* --- LARGE IMAGE / BANNER --- */}
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-orange-900/10">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            {/* Priority Badge Overlay */}
            <div className="absolute top-8 left-8 bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg">
              <Zap size={18} fill="currentColor" />
              Premium Choice
            </div>
          </div>

          {/* --- PRODUCT CONTENT --- */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <span className="text-stone-400 font-medium">4.8 (120+ Sold)</span>
            </div>

            {/* PRODUCT TITLE */}
            <h1 className="text-4xl md:text-6xl font-black text-[#5D4037] mb-4 leading-tight">
              {product.title}
            </h1>

            {/* META INFO (Price & Date) */}
            <div className="flex items-center gap-8 mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">Price</p>
                <p className="text-4xl font-black text-orange-600">{product.price}</p>
              </div>
              <div className="h-10 w-[1px] bg-orange-100" />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">Listed On</p>
                <div className="flex items-center gap-2 text-[#5D4037] font-bold">
                  <Calendar size={16} />
                  <span>Oct 24, 2023</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-orange-100 w-full mb-8" />

            {/* FULL DESCRIPTION */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-[#5D4037] mb-3 uppercase tracking-wider">Product Details</h3>
              <p className="text-stone-600 text-lg leading-relaxed italic">
                {product.description || "Every curve and joint of this exquisite piece has been meticulously crafted to offer both aesthetic beauty and structural integrity. Sourced from sustainable forests, the wood features a unique grain pattern that ensures your piece is truly one-of-a-kind. Perfect for modern minimalist interiors or classic rustic homes."}
              </p>
            </div>

            {/* QUANTITY & ACTION */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <div className="flex items-center justify-between border-2 border-orange-100 rounded-2xl px-4 py-3 bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 text-[#5D4037]"
                >
                  -
                </button>
                <span className="px-8 font-black text-xl min-w-[60px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 text-[#5D4037]"
                >
                  +
                </button>
              </div>

              <Button className="flex-1 bg-[#5D4037] hover:bg-orange-600 text-white rounded-2xl py-8 text-xl font-bold shadow-xl transition-all active:scale-95">
                <ShoppingBag className="mr-3 h-6 w-6" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-[2rem] border-2 border-dashed border-orange-100 bg-orange-50/30">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="text-orange-600" size={24} />
                <span className="text-xs font-bold uppercase text-stone-500">Expedited Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-y sm:border-y-0 sm:border-x border-orange-100 py-4 sm:py-0">
                <ShieldCheck className="text-orange-600" size={24} />
                <span className="text-xs font-bold uppercase text-stone-500">Lifetime Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="text-orange-600" size={24} />
                <span className="text-xs font-bold uppercase text-stone-500">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
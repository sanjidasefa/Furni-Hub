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
  RotateCcw 
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
        const res = await fetch(`/api/all-product`);
        const data = await res.json();
        const singleProduct = data.find((item) => item.id.toString() === id);
        setProduct(singleProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
      <div className="h-12 w-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div className="text-center py-20 text-[#5D4037]">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link href="/product" className="flex items-center text-stone-500 hover:text-orange-600 mb-8 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Product Image */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-orange-900/5">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Product Content */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <span className="text-stone-400 text-sm">(48 Customer Reviews)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-4">
              {product.title}
            </h1>
            
            <p className="text-3xl font-bold text-orange-600 mb-6">
              {product.price}
            </p>

            <div className="h-px bg-orange-100 w-full mb-6" />

            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {product.description || "Elevate your living space with this hand-crafted masterpiece. Made from sustainably sourced solid wood, this piece combines timeless design with unmatched durability."}
            </p>

            {/* Quantity and CTA */}
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center border border-orange-200 rounded-full px-4 py-2 bg-white">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-2xl px-2 text-[#5D4037]">-</button>
                <span className="px-6 font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-2xl px-2 text-[#5D4037]">+</button>
              </div>

              <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-full py-7 text-lg shadow-xl shadow-orange-200 transition-all hover:scale-105">
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-orange-100 pt-8">
              <div className="flex items-center gap-3 text-stone-500">
                <Truck className="text-orange-600" size={20} />
                <span className="text-xs font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <ShieldCheck className="text-orange-600" size={20} />
                <span className="text-xs font-medium">Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <RotateCcw className="text-orange-600" size={20} />
                <span className="text-xs font-medium">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
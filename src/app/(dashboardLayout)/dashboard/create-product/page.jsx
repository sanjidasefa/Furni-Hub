"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

export default function CreateProduct() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== "authenticated") {
      toast.error("Please login to add products");
      return router.push("/login");
    }

    setLoading(true);
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData.entries());
    productData.price = Number(productData.price);

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        router.push("/dashboard/manage-products");
      }
    } catch (error) {
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 min-h-screen">
      <div className="mb-12 border-b border-stone-100 pb-6">
        <h1 className="text-3xl font-bold text-[#5D4037]">Add New Product</h1>
        <p className="text-stone-500 mt-2">Fill out the form below to list a new furniture item.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Title */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700">Product Title</label>
          <Input name="title" required placeholder="e.g. Nordic Velvet Sofa" className="h-12 border-stone-200 focus:border-orange-600 focus:ring-0 rounded-lg text-stone-900" />
        </div>

        {/* Descriptions */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700">Short Description</label>
          <Input name="shortDescription" required placeholder="A quick summary of the item" className="h-12 border-stone-200 focus:border-orange-600 focus:ring-0 rounded-lg" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700">Full Description</label>
          <Textarea name="fullDescription" required placeholder="Detailed information about the product..." className="min-h-[120px] border-stone-200 focus:border-orange-600 focus:ring-0 rounded-lg p-4" />
        </div>

        {/* Price & Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700">Price (USD)</label>
            <Input name="price" type="number" required placeholder="850" className="h-12 border-stone-200 focus:border-orange-600 focus:ring-0 rounded-lg" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700">Priority</label>
            <select name="priority" className="w-full h-12 border border-stone-200 rounded-lg px-3 focus:outline-none focus:border-orange-600 bg-white">
              <option value="Normal">Normal</option>
              <option value="High">High (Featured)</option>
            </select>
          </div>
        </div>

        {/* Image Link */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-stone-700">Image URL (Optional)</label>
          <Input name="imageUrl" placeholder="https://example.com/image.jpg" className="h-12 border-stone-200 focus:border-orange-600 focus:ring-0 rounded-lg" />
        </div>

        {/* Buttons */}
        <div className="pt-6 flex items-center gap-4">
          <Button 
            disabled={loading}
            className="bg-[#5D4037] hover:bg-orange-600 text-white px-8 py-6 rounded-lg font-bold transition-all flex-1 md:flex-none"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
            Add Product
          </Button>
          <button type="button" onClick={() => router.back()} className="text-stone-500 font-medium hover:text-black px-4">Cancel</button>
        </div>
      </form>
    </div>
  );
}
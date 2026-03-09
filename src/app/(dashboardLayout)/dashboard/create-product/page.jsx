"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // NextAuth ব্যবহার করুন
import { Loader2, PlusCircle, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    date: new Date().toISOString().split('T')[0],
    priority: "Normal",
    imageUrl: ""
  });

  // সেশন চেক করার জন্য useEffect এর আর দরকার নেই যদি আপনি middleware ব্যবহার করেন। 
  // তবে চাইলে রাখতে পারেন।
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowSuccess(false);

    try {
      // আপনার আগের এপিআই রুট অনুযায়ী পাথটি ঠিক করুন
      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowSuccess(true);
        toast.success("Product added successfully!");
        // ফর্ম রিসেট করা
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          date: new Date().toISOString().split('T')[0],
          priority: "Normal",
          imageUrl: ""
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
        <p className="mt-4 text-[#5D4037] font-bold tracking-widest uppercase text-sm">Verifying Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-12 px-6">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#5D4037]">Add New Product</h1>
            <p className="text-stone-500">Enter details to list a new piece in the collection.</p>
          </div>
          <div className="bg-orange-100 text-orange-700 p-3 rounded-2xl">
            <PlusCircle size={28} />
          </div>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
            <CheckCircle2 size={20} />
            <span className="font-bold">Success! Product has been added to the catalog.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-orange-900/5 border border-orange-50">
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037]">Product Title</label>
              <Input 
                required
                placeholder="e.g. Minimalist Oak Chair"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="rounded-xl border-orange-100 py-6"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037]">Short Description</label>
              <Input 
                required
                placeholder="Brief summary for cards..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                className="rounded-xl border-orange-100 py-6"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037]">Full Description</label>
              <Textarea 
                required
                placeholder="Detailed information..."
                rows={4}
                value={formData.fullDescription}
                onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                className="rounded-2xl border-orange-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037]">Price ($)</label>
                <Input 
                  required
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="rounded-xl border-orange-100 py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037]">Listing Date</label>
                <Input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="rounded-xl border-orange-100 py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037]">Priority</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full h-[50px] rounded-xl border border-orange-100 px-3 text-sm focus:ring-2 focus:ring-orange-200"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High / Featured</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037]">Image URL</label>
              <div className="relative">
                <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input 
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="rounded-xl border-orange-100 pl-12 py-6"
                />
              </div>
            </div>
          </div>

          <Button 
            disabled={loading}
            className="w-full bg-[#5D4037] hover:bg-orange-600 text-white py-8 rounded-2xl text-lg font-bold"
          >
            {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Adding...</> : "Add Product to Collection"}
          </Button>
        </form>
      </div>
    </div>
  );
}
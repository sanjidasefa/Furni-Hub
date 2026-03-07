"use client";
import { useEffect, useState } from "react";
import { meouter } from "next/navigation";
import { Loader2, PlusCircle, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductPage() {
  const router = meouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
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

  useEffect(() => {
    setMounted(true);
    const savedme = localStorage.getItem("furni_me");
    
    if (!savedme) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowSuccess(true);
    }
  } catch (error) {
    console.error("Error adding product:", error);
  } finally {
    setLoading(false);
  }
};

  if (!mounted || !isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
        <p className="mt-4 text-[#5D4037] font-bold tracking-widest uppercase text-sm">Verifying Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-12 px-6">
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

        {/* Success Toast / message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 size={20} />
            <span className="font-bold">Success! Product has been added to the database.</span>
          </div>
        )}

        {/* --- FORM --- */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-orange-900/5 border border-orange-50">
          
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037] ml-1">Product Title</label>
              <Input 
                required
                placeholder="e.g. Minimalist Oak Chair"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="rounded-xl border-orange-100 focus:ring-orange-600 py-6"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037] ml-1">Short Description (1-2 lines)</label>
              <Input 
                required
                placeholder="Brief summary for product cards..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                className="rounded-xl border-orange-100 py-6"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037] ml-1">Full Description</label>
              <Textarea 
                required
                placeholder="Detailed craftsmanship and material info..."
                rows={4}
                value={formData.fullDescription}
                onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                className="rounded-2xl border-orange-100 resize-none"
              />
            </div>

            {/* Row: Price, Date, Priority */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037] ml-1">Price ($)</label>
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
                <label className="text-sm font-bold text-[#5D4037] ml-1">Listing Date</label>
                <Input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="rounded-xl border-orange-100 py-6 text-stone-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037] ml-1">Priority</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full h-[50px] rounded-xl border border-orange-100 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High / Featured</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037] ml-1">Optional Image URL</label>
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
            className="w-full bg-[#5D4037] hover:bg-orange-600 text-white py-8 rounded-2xl text-lg font-bold transition-all mt-4"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Adding to Catalog...</>
            ) : (
              "Add Product to Collection"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
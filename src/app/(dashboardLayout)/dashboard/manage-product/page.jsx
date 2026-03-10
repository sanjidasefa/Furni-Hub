"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Package, Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this furniture?")) {
      try {
        const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
        if (res.ok) {
          setProducts((prev) => prev.filter((p) => p._id !== id));
          toast.success("Product deleted successfully!");
        }
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/product/${editingProduct._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      if (res.ok) {
        toast.success("Product updated!");
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#FDFBF9]">
        <Loader2 className="animate-spin text-orange-600 h-10 w-10" />
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Package className="text-orange-600 h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-black text-[#5D4037]">Manage Inventory</h1>
        </div>
        <div className="text-sm font-bold bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
          Total: {products.length} Products
        </div>
      </div>

      {/* --- Desktop View (Table) --- */}
      <div className="hidden md:block bg-white rounded-[2rem] border border-orange-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-orange-50 text-[#5D4037] font-bold">
            <tr>
              <th className="p-6">Product Details</th>
              <th className="p-6">Category</th>
              <th className="p-6">Price</th>
              <th className="p-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-orange-50 hover:bg-stone-50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.imageUrl || "/placeholder.png"}
                      className="h-10 w-10 rounded-lg object-cover"
                      alt={p.title || "product"} 
                    />
                    <span className="font-bold text-[#5D4037]">{p.title}</span>
                  </div>
                </td>
                <td className="p-6 text-stone-500 font-medium">{p.category || "Furniture"}</td>
                <td className="p-6 font-black text-orange-600">${p.price}</td>
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={() => setEditingProduct(p)} className="text-blue-600 border-blue-100 hover:bg-blue-50">
                      <Edit size={18} />
                    </Button>
                    <Button variant="destructive" onClick={() => deleteProduct(p._id)} className="bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border-none">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile View --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-5 rounded-3xl border border-orange-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={p.imageUrl || "/placeholder.png"} 
                  className="h-12 w-12 rounded-xl object-cover" 
                  alt={p.title || "product"} 
                />
                <div>
                   <h3 className="font-bold text-[#5D4037]">{p.title}</h3>
                   <p className="text-xs text-stone-400">{p.category || "General"}</p>
                </div>
              </div>
              <span className="font-black text-orange-600">${p.price}</span>
            </div>
            <div className="flex gap-2 pt-4 border-t border-orange-50">
               <Button onClick={() => setEditingProduct(p)} className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 border-none shadow-none">Edit</Button>
               <Button onClick={() => deleteProduct(p._id)} variant="destructive" className="flex-1">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Edit Modal --- */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative">
            <button 
              type="button"
              onClick={() => setEditingProduct(null)} 
              className="absolute right-6 top-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="text-stone-400 h-5 w-5" />
            </button>
            <h2 className="text-2xl font-black text-[#5D4037] mb-6">Edit Furniture</h2>
            
            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-400 uppercase ml-1">Title</label>
                <Input 
                  value={editingProduct.title || ""} 
                  onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})} 
                  className="rounded-xl border-stone-200" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-400 uppercase ml-1">Price ($)</label>
                <Input 
                  type="number" 
                  value={editingProduct.price || ""} 
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} 
                  className="rounded-xl border-stone-200" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-stone-400 uppercase ml-1">Image URL</label>
                <Input 
                  value={editingProduct.imageUrl || ""} 
                  onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})} 
                  className="rounded-xl border-stone-200" 
                />
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="submit" disabled={updateLoading} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12 font-bold">
                  {updateLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-20 text-stone-400 font-medium">No inventory found. Start adding some!</div>
      )}
    </div>
  );
}
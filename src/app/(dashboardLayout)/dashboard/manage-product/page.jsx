"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Package, Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); // এডিট করার জন্য স্টেট
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
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
  }

  // --- Delete Function ---
  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this furniture?")) {
      try {
        const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
        if (res.ok) {
          setProducts(products.filter((p) => p._id !== id));
          toast.success("Product deleted successfully!");
        }
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  // --- Update Function ---
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

      {/* Table View */}
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
                      alt=""
                    />
                    <span className="font-bold text-[#5D4037]">{p.title}</span>
                  </div>
                </td>
                <td className="p-6 text-stone-500 font-medium">{p.category || "Furniture"}</td>
                <td className="p-6 font-black text-orange-600">${p.price}</td>
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setEditingProduct(p)}
                      className="text-blue-600 border-blue-100 hover:bg-blue-50"
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border-none transition-all"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal (এটি এডিট বাটনে ক্লিক করলে দেখা যাবে) */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#5D4037]">Edit Product</h2>
              <button onClick={() => setEditingProduct(null)}><X className="text-stone-400" /></button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase">Product Title</label>
                <Input 
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase">Price ($)</label>
                <Input 
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase">Image URL</label>
                <Input 
                  value={editingProduct.imageUrl || ""}
                  onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="submit" disabled={updateLoading} className="flex-1 bg-[#5D4037]">
                  {updateLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-20 text-stone-400">Inventory is empty.</div>
      )}
    </div>
  );
}
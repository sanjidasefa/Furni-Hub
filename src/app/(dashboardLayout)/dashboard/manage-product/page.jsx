"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Package, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  // --- Delete Function with API Call ---
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
          <h1 className="text-2xl md:text-3xl font-black text-[#5D4037]">
            Manage Inventory
          </h1>
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
              <tr
                key={p._id}
                className="border-b border-orange-50 hover:bg-stone-50 transition-colors"
              >
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-stone-100 overflow-hidden">
                      <img
                        src={p.imageUrl || "/placeholder.png"}
                        alt={p.title}
                        className="object-cover h-full w-full"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>
                    <span className="font-bold text-[#5D4037]">{p.title}</span>
                  </div>
                </td>
                <td className="p-6 text-stone-500 font-medium">
                  {p.category || "Furniture"}
                </td>
                <td className="p-6 font-black text-orange-600">${p.price}</td>
                <td className="p-6 text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
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

      {/* --- Mobile View (Cards) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-5 rounded-3xl border border-orange-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-[#5D4037] text-lg">{p.title}</h3>
                <p className="text-sm text-stone-400">
                  {p.category || "Living Room"}
                </p>
              </div>
              <span className="font-black text-orange-600 text-xl">
                ${p.price}
              </span>
            </div>
            <div className="flex gap-2 pt-4 border-t border-orange-50">
              <Button className="flex-1 bg-stone-100 text-stone-700 hover:bg-stone-200">
                Edit
              </Button>
              <Button
                onClick={() => deleteProduct(p._id)}
                variant="destructive"
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          Inventory is empty.
        </div>
      )}
    </div>
  );
}

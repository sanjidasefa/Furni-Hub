"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Package } from "lucide-react";

export default function ManageProducts() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    fetchProducts();
  }, []);
  const deleteProduct = (id) => {
    if(confirm("Are you sure?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Package className="text-orange-600 h-8 w-8" />
        <h1 className="text-3xl font-black text-[#5D4037]">Manage All Products</h1>
      </div>
      <div className="bg-white rounded-[2rem] border border-orange-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-orange-50 text-[#5D4037] font-bold">
            <tr>
              <th className="p-6">Product Name</th>
              <th className="p-6">Category</th>
              <th className="p-6">Price</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
  <tr key={p._id}>
    <td className="p-6">{p.title}</td>
  
    <Button onClick={() => deleteProduct(p._id)}> 
      <Trash2 size={18} />
    </Button>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
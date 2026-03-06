"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Package } from "lucide-react";

export default function ManageProducts() {
  const [products, setProducts] = useState([
    { id: 1, title: "Velvet Sofa", price: 450, category: "Living Room" },
    { id: 2, title: "Wooden Table", price: 200, category: "Dining" },
  ]);

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
              <tr key={p.id} className="border-t border-orange-50 hover:bg-orange-50/30 transition-colors">
                <td className="p-6 font-semibold text-[#5D4037]">{p.title}</td>
                <td className="p-6 text-stone-500">{p.category}</td>
                <td className="p-6 font-bold text-orange-600">${p.price}</td>
                <td className="p-6 flex gap-3">
                  <Button variant="ghost" className="text-blue-600 hover:bg-blue-50"><Edit size={18} /></Button>
                  <Button onClick={() => deleteProduct(p.id)} variant="ghost" className="text-red-600 hover:bg-red-50">
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
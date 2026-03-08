import { getDb } from "@/lib/db"; 
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await getDb(); 
    const product = await Product.findById(id);    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }   
    return NextResponse.json(product);
  } catch (error) {
    console.error("Single Product Error:", error.message);
    return NextResponse.json(
      { error: "Server error", details: error.message }, 
      { status: 500 }
    );
  }
}
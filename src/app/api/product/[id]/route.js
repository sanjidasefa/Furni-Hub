import { db as connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      console.log("No product found for ID:", id);
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
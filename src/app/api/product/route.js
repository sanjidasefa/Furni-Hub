import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    console.log("Database connect hocche...");
    await connectDB();
    
    console.log("Data find kora hocche...");
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { error: "Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}
import { db } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await db();
    const products = await Product.find({});
    console.log("DB internal check:", products.length, "items found");    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Server Route Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
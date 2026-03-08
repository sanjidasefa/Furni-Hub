import { getDb } from "@/lib/db"; 
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb(); 
    const products = await db.collection("product-collection").find({}).toArray();
    console.log("Items found in product-collection:", products.length);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Server Route Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { getDb } from "@/lib/db"; 
import { ObjectId } from "mongodb"; 
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
    const db = await getDb(); 
    const product = await db.collection("product-collection").findOne({
      _id: new ObjectId(id)
    });   
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
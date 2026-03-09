import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await getDb();
    const body = await req.json();
    const result = await db.collection("product-collection").insertOne({
      ...body,
      price: parseFloat(body.price), 
      createdAt: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Product added successfully", 
      id: result.insertedId 
    });
  } catch (error) {
    console.error("POST API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const db = await getDb();
    const products = await db
      .collection("product-collection")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" }, 
      { status: 500 }
    );
  }
}
import { db } from "@/lib/db";
import Product from "@/models/Product"; 
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db();
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await db();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = [
      { id: 1, title: "Nordic Oak Chair", price: "$120" },
      { id: 2, title: "Modern Sofa", price: "$850" }
    ];
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
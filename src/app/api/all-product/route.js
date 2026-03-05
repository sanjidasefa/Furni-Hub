import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = [
      {
        id: 1,
        title: "Classic Oak Chair",
        price: "$120",
        description: "Handcrafted solid oak wood chair.",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000",
      },
      {
        id: 2,
        title: "Minimalist Coffee Table",
        price: "$250",
        description: "Perfect for modern living rooms.",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
      }
    ];

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}
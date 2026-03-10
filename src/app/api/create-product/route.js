import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized! Please login first." },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { title, shortDescription, fullDescription, price, priority, imageUrl } = body;
    if (!title || !shortDescription || !fullDescription || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await getDb();
    const newProduct = {
      title,
      shortDescription,
      fullDescription,
      price: parseFloat(price), 
      priority: priority || "Normal",
      imageUrl: imageUrl || "",
      authorEmail: session.user.email,
      createdAt: new Date(),
    };
    const result = await db.collection("products").insertOne(newProduct);
    return NextResponse.json(
      { message: "Product added successfully", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
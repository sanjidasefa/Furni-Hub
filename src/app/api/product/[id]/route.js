import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const db = await getDb();
    const product = await db.collection("product-collection").findOne({ _id: new ObjectId(id) });
    
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db.collection("product-collection").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Deleted successfully" });
    }
    return NextResponse.json({ error: "Failed to delete" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = await getDb();
    const { _id, ...updateData } = body; 
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    const result = await db.collection("product-collection").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
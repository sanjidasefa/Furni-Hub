import { getDb } from "@/lib/db"; 
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const database = await getDb();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" }, 
        { status: 400 }
      );
    }
    const existingUser = await database.collection("user-collection").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Account already exists with this email" }, 
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      role: "admin",
      createdAt: new Date(),
    };
    const result = await database.collection("user-collection").insertOne({
      ...newUser,
      password: hashedPassword,
    });
    return NextResponse.json(
      { 
        message: "Account created successfully!",
        user: { id: result.insertedId, ...newUser }
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API Error:", error); 
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
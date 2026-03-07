import { mongoConnect } from "@/lib/mongoConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { client, db } = await mongoConnect();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await db.collection("user-collection").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.collection("user-collection").insertOne({
      username,
      email,
      password: hashedPassword,
      role: "admin", // Default role
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
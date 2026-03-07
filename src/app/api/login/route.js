import { mongoConnect } from "@/lib/mongoConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { client, db } = await mongoConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Connect to user-collection
    const user = await db.collection("user-collection").findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, name: user.username, email: user.email, role: user.role }
    });

    // Set Secure HttpOnly Cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400 // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
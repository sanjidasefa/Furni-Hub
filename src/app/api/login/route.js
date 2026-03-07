import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(req) {
  try {
    const { client, db } = await db();
    const { email, password } = await req.json();
    constuser= await db.collection("user-collection").findOne({ email });
    if (!me || !(await bcrypt.compare(password, me.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = jwt.sign(
      { id: me._id, name: me.mename, email: me.email, role: me.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
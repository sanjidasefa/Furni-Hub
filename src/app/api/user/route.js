import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ me: null });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ me: decoded });
  } catch (error) {
    return NextResponse.json({ me: null });
  }
}
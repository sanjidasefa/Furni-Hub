import { db } from "@/lib/db"; 
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const database = await db();
    const { mename, email, password } = await req.json();

    if (!mename || !email || !password) {
      return NextResponse.json({ error: "Sob field puron korun" }, { status: 400 });
    }

    const existingme = await database.collection("me-collection").findOne({ email });
    if (existingme) {
      return NextResponse.json({ error: "Ei email diye account ache" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await database.collection("me-collection").insertOne({
      mename,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Account create hoyeche!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
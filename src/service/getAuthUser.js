// "use server";

// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function getAuthme() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return decoded;
//   } catch {
//     return null;
//   }
// }
// src/service/getAuthme.js
export const getAuthme = () => {
  if (typeof window !== "undefined") {
    constuser= localStorage.getItem("furni_me");
    returnuser? JSON.parse(me) : null;
  }
  return null;
};
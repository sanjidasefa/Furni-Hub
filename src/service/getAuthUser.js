// "use server";

// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function getAuthUser() {
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
// src/service/getAuthUser.js
export const getAuthUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("furni_user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};
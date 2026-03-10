import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const db = await getDb();
        const user = await db.collection("user-collection").findOne({ email: credentials.email });
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            role: user.role 
          };
        }
        return null;
      }
    })
  ],
callbacks: {
  async signIn({ user, account }) {
    if (account.provider === "google") {
      try {
        const db = await getDb();
        const existingUser = await db.collection("user-collection").findOne({ email: user.email });
        
        if (!existingUser) {
          await db.collection("user-collection").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "admin",
            createdAt: new Date()
          });
        }
        return true;
      } catch (error) {
        console.error("Error saving google user:", error);
        return false;
      }
    }
    return true; 
  },
  
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role || "admin"; 
    }
    return token;
  },
  
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id;
      session.user.role = token.role;
    }
    return session;
  },
},
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
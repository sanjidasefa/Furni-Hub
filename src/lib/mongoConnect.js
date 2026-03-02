import { MongoClient } from "mongodb";

// if (process.env.NODE_ENV === "development") {
//   setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare + Google DNS
// }

if (!process.env.MONGODB_URI) {
  throw new Error("No mongodb uri found!");
}

const uri = process.env.MONGODB_URI;

export async function mongoConnect() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("NextEvent");
  return { client, db };
}

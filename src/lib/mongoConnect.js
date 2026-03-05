import { MongoClient } from "mongodb";

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

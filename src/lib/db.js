import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let dbInstance;

export async function db() {
  if (dbInstance) return dbInstance;
  if (!client) {
    client = await MongoClient.connect(uri);
  }
  dbInstance = client.db("FurniHub");
  return dbInstance;
}
import { MongoClient } from "mongodb";
import 'dotenv/config'

let db = null;

export const connectDB = async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  
  db = client.db();
  console.log("Mongo DB is connecting...");
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database is not found");
  } 
  return db;
};

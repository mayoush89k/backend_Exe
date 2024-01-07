import { ObjectId } from "mongodb";
import { getDB } from "../db/db.connection.js";

export const createUserDB = async (user) => {
  const db = getDB();
  const newUser = await db.collection("users").insertOne(user);
  return await getUserByIdDB(newUser.insertedId);
};

export const getUserByUsernameDB = async (username) => {
    console.log('username: ', username);
  const db = getDB();
  const user = await db.collection("users").findOne({ username:username });
  console.log('user: ', user);
  return user;
};

export const getUserByIdDB = async (id) => {
  const db = getDB();
  const object_id = new ObjectId(id);
  return await db.collection("users").findOne({ _id: object_id });
};

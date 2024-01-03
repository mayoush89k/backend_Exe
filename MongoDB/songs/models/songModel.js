import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { DATABASE_COLLECTIONS } from "../constants/databaseCollection.js";

export const getAllSongsDB = async () => {
  const db = getDB();
  return db.collection(DATABASE_COLLECTIONS.SONGS).find({}).toArray();
};

export const getSongByIdDB = async (id) => {
  const db = getDB();
  if (!ObjectId.isValid(id)) {
    throw new Error("Song Not Found");
  }
  const songId = new ObjectId(id);

  return await db
    .collection(DATABASE_COLLECTIONS.SONGS)
    .findOne({ _id: songId });
};

export const createSongDB = async (song) => {
  const db = getDB();
  const result = await db
    .collection(DATABASE_COLLECTIONS.SONGS)
    .insertOne(song);
  const insertId = result.insertedId;
  return await getSongByIdDB(insertId.toString());
};

export const getSongByTitleDB = async (title) => {
  const db = getDB();
  return await db.collection(DATABASE_COLLECTIONS.SONGS).findOne({ title });
};

export const updateSongDB = async (id, updateSong) => {
  const db = getDB();
  const songId = new ObjectId(id);
  await db
    .collection(DATABASE_COLLECTIONS.SONGS)
    .updateOne({ _id: songId }, { $set: updateSong });
  return await getSongByIdDB(id);
};

export const deleteSongDB = async (id) => {
  const db = getDB();
  const songId = new ObjectId(id)
  return await db.collection(DATABASE_COLLECTIONS.SONGS).deleteOne({_id:songId})
}

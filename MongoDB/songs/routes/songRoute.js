import express from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSongById,
  updateSong,
} from "../controllers/songsController.js";

const router = express.Router();

//route to get all Songs
router.get("/", getAllSongs);

// route to get a single Song by id
router.get("/:id", getSongById);

// route to create a new Song
router.post("/", createSong);

// Route to update an existing Song
router.put("/:id", updateSong);

//Route to delete a Song
router.delete("/:id", deleteSong);

export default router;

import STATUS_CODE from "../constants/statusCodes.js";
import {
  createSongDB,
  deleteSongDB,
  getAllSongsDB,
  getSongByIdDB,
  getSongByTitleDB,
  updateSongDB,
} from "../models/songModel.js";

//@des          Get all songs
//@route        Get /api/v1/songs
//@access       Public
export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await getAllSongsDB();
    res.send(songs);
  } catch (error) {
    next(error);
  }
};

//@des          Get single songs
//@route        Get /api/v1/songs/:id
//@access       Public
export const getSongById = async (req, res, next) => {
  try {
    const song = await getSongByIdDB(req.params.id);
    if (!song) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("song not found");
    }
    res.send(song);
  } catch (error) {
    next(error);
  }
};

//@des          create a song
//@route        POST /api/v1/songs
//@access       Public
export const createSong = async (req, res, next) => {
  try {
    const { title, artist, album, releaseDate, genre, duration } = req.body;
    if (!title || !artist || !album || !releaseDate || !genre || !duration) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All Fields (Title, Artist, Album, ReleaseDate, Genre, Duration) are required"
      );
    }
    // check for existing song by title
    const existingSong = await getSongByTitleDB(title);
    if (existingSong) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A Song with this Title already exists");
    }
    const newSong = await createSongDB({
      title,
      artist,
      album,
      releaseDate,
      genre,
      duration,
    });
    res.status(STATUS_CODE.CREATED).send(newSong);
  } catch (error) {
    next(error);
  }
};

//@des          update a song by id
//@route        Get /api/v1/songs/:id
//@access       Public
export const updateSong = async (req, res, next) => {
  try {
    const { title, artist, album, releaseDate, genre, duration } = req.body;
    if (!title || !artist || !album || !releaseDate || !genre || !duration) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All Fields (Title, Artist, Album, ReleaseDate, Genre, Duration) are required"
      );
    }
    // check if another song with same title exists (excluding the current movie)
    const existingSong = await getSongByTitleDB(title);
    if (existingSong && existingSong._id.toString() !== req.params.id) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Song with same title already exist");
    }
    const updatedSong = await updateSongDB(req.params.id , {title, artist , album , releaseDate , genre , duration})
    if(!updatedSong){
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`No song with the id of ${songId}`)
    }
    res.send(updatedSong)
  } catch (error) {
    next(error);
  }
};

//@des          delete a song
//@route        delete /api/v1/songs/:id
//@access       Public
export const deleteSong = async (req, res, next) => {
  try {
    const songId = req.params.id
    const song = await getSongByIdDB(songId)
    if (!song) {
      res.status(STATUS_CODE.NOT_FOUND)
      throw new Error(`No song with the id of ${songId}`)
    }
    await deleteSongDB(songId)
  } catch (error) {
    next(error);
  }
};

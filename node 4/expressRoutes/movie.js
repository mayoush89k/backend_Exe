import express, { json } from "express";
import { readFileSync, writeFileSync } from "fs";

const server = express();
server.use(express.json());
const jsonFile = readFileSync("./movies.json", "utf-8");
const movies = "./movies.json";
let db = [];

// get all movies
server.get("/movie", async (req, res) => {
  db = JSON.parse(jsonFile);
  console.log(db);
  res.end(`success using ${req.method} in ${req.url} , ${db}`);
});
// get special movie by id
server.get("/movie/:ID", async (req, res) => {
  db = JSON.parse(jsonFile);
  const movie = db.find((t) => t.id === Number(req.params.ID));
  res.send(
    `success using ${req.method} in ${req.url} for movie ${req.params.ID} with title: ${movie?.title}`
  );
});

//creating new movie
server.post("/movie", (req, res) => {
  db = JSON.parse(jsonFile);
  const newMovie = req.body;
  newMovie.id = db.length + 1;
  db.push(newMovie);
  writeFileSync("movies.json", JSON.stringify(db));
  res.end(
    `success using ${req.method} in ${req.url}, ${newMovie.id} title: ${newMovie?.title} has created`
  );
});

// updating a movie
server.put("/movie/:ID", (req, res) => {
  db = JSON.parse(jsonFile);
  const updatedMovie = db.find((t) => t.id === Number(req.params.ID));
  console.log("updatedMovie: ", updatedMovie);
  db[updatedMovie.id - 1] = {
    ...db[updatedMovie.id - 1],
    ...req.body,
    id: updatedMovie.id,
  };
  console.log("db[updatedMovie.id]: ", db[updatedMovie.id]);

  writeFileSync("movies.json", JSON.stringify(db));

  res.end(`success using ${req.method} in ${req.url}`);
});
server.delete("/movie/:ID", (req, res) => {
  db = JSON.parse(jsonFile);
  const updatedMoviesList = db.filter((t) => t.id !== Number(req.params.ID));
  console.log(updatedMoviesList);
  writeFileSync("movies.json", JSON.stringify(updatedMoviesList));
  res.end(`success using ${req.method} in ${req.url}`);
});
server.listen(4545, () => {
  console.log("server is listening");
});

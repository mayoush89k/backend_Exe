import express from "express";
import { readFileSync, writeFileSync } from "fs";

const server = express();

server.use(express.json());

const jsonFile = readFileSync("./movies.json", "utf-8");
let db = [];

// get all movies
server.get("/movies", async (req, res) => {
  db = JSON.parse(jsonFile);
  res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  console.log(db);
  res.end(jsonFile);
});

// get special movie by id
server.get("/movies/:ID", async (req, res) => {
  db = JSON.parse(jsonFile);
  res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  const movie = db.find((t) => t.id === Number(req.params.ID));
  res.send(
    `success using ${req.method} in ${req.url} for movie ${req.params.ID} with title: ${movie?.title}`
  );
});

// get a movies list by searching by name
server.get("/movies?name=:name", (req, res) => {
  res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  db = JSON.parse(jsonFile);
  let searchName = req.query.name;
  const newList = db.filter((currentMovie) => {
    currentMovie.toLowerCase().includes(searchName.toLowerCase());
  });
  res.send(JSON.stringify(newList));
});

//creating new movie
server.post("/movies", (req, res) => {
  res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
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
server.put("/movies/:ID", (req, res) => {
    res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
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

res.end(
  `success using ${req.method} in ${req.url}`
);
//   res.end(jsonFile);
});

// deleting movie
server.delete("/movies/:ID", (req, res) => {
  res.appendHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  db = JSON.parse(jsonFile);
  const updatedMoviesList = db.filter((t) => t.id !== Number(req.params.ID));
  console.log(updatedMoviesList);
  writeFileSync("movies.json", JSON.stringify(updatedMoviesList));
  res.end(`success using ${req.method} in ${req.url}`);
});

server.listen(4545, () => {
  console.log("server is listening");
});

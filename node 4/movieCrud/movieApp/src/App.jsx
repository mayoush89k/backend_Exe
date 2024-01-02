import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    fetch("http://localhost:4545/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMoviesList(data);
      });
  }, []);
  return (
    <>
      <h1>Movie List</h1>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          fetch("http://localhost:4545/movies?name=" + inputValue)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setMoviesList(data);
            });
        }}
      />
      <div id="container">
        {moviesList.map((movie, index) => (
          <div className="card" key={index}>
            <h1>{movie.title}</h1>
            Director : {movie.director && movie.director}
            <br />
            <img src={movie.img && movie.img} />
            <input
              type="text"
              placeholder="add image url"
              onChange={(e) =>
                fetch("http://localhost:4545/movies/" + movie.id, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    img: e.target.value,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    // setMoviesList(data);
                  })
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

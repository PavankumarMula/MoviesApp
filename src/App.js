import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setError(null);
      setISLoading(true);
      const promise = await fetch(
        "https://react-92f28-default-rtdb.firebaseio.com/movies.json"
      );
      if (!promise.ok) {
        throw new Error("Something Went Wrong");
      }
      const realdata = await promise.json();
      const movieArray = [];
      for (let key in realdata) {
        movieArray.push({
          id: key,
          title: realdata[key].title,
          releasingDate: realdata[key].releaseDate,
          openingText: realdata[key].openingText,
        });
      }

      setMovies(movieArray);
    } catch (error) {
      setError(error.message);
    }
    setISLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  let content = <p>Found No Movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDelete={removeHandler}/>;
  }
  if (error) {
    content = <button onClick={fetchMoviesHandler}>Retry</button>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-92f28-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
 async function removeHandler(id){
   await fetch(`https://react-92f28-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method:'DELETE'
    })
    const promise = await fetch(
      "https://react-92f28-default-rtdb.firebaseio.com/movies.json"
    )
    const data=await promise.json()
    const movieArray2 = [];
      for (let key in data) {
        movieArray2.push({
          id: key,
          title: data[key].title,
          releasingDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      setMovies(movieArray2);
  }

  return (
    <React.Fragment>
      <AddMovie onAddMovie={addMovieHandler} onRemove={removeHandler} />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

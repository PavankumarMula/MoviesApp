import React,{useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';


function App() {
const[movies,setMovies]=useState([])
 async function fetchMoviesHandler (){
  const promise=await fetch('https://swapi.dev/api/films');
  const realdata=await promise.json();
 const moviesList= realdata.results.map(item=>{
    return {
      id:item.episode_id,
      title:item.title,
      releasingDate:item.release_date,
      openingText:item.opening_crawl
    }
  })
  setMovies(moviesList);
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;

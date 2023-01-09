import React,{useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';


function App() {
const[movies,setMovies]=useState([])
const [isLoading,setISLoading]=useState(false);
 async function fetchMoviesHandler (){
  setISLoading(true)
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
  setISLoading(false);
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading &&<MoviesList movies={movies} />}
        {!isLoading && <p>Click On Fetch button to get Movie list</p>}
        {isLoading &&<p>Is Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

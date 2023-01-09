import React,{useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';


function App() {
const[movies,setMovies]=useState([])
const [isLoading,setISLoading]=useState(false);
const [error,setError]=useState(null);
 async function fetchMoviesHandler (){
  try{
    setError(null)
    setISLoading(true)
    const promise=await fetch('https://swapi.dev/api/film');
    if(!promise.ok){
      throw new Error('Something Went Wrong');
    }
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
   
  } catch(error){
    setError(error.message);
  }
  setISLoading(false);
 }
  let content=<p>Found No Movies</p>
  if(movies.length>0){
    content=<MoviesList movies={movies}/>
  }
  if(error){
    content=<button onClick={fetchMoviesHandler}>Retry</button>
  }

  if(isLoading){
    content=<p>Loading...</p>
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;

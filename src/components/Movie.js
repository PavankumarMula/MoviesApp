import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
   function deleteHandler(event){
    const id=event.target.id;
    props.onremove(id);
   }
  
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button id={props.id} onClick={deleteHandler} style={{backgroundColor:'red'}}>Delete</button>
    </li>
  );
};

export default Movie;

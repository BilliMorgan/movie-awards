import React from "react";
import Movie from "./Movie";
import "../Style.css";

const Results = (props) => {
  let movies = props.results;
  console.log(props)
  
  return (
    <section className="results">
      <div>
        <h3>Results for "{props.term}":</h3>
      </div>
      {movies.map((movie) => (
        <Movie key={movie.imdbID} clicked = {() => console.log( movie.imdbID)} {...movie} />
      ))}
    </section>
  );
};

export default Results;

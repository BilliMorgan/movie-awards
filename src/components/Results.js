import React from "react";
import Movie from "./Movie";
import "../Style.css";

const Results = (props) => {
  let movies = props.results;
  return (
    <section className="results">
      <div>
        <h3>Results for "{props.term}":</h3>
      </div>

      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          clicked={(movieId) => props.clicked(movie.imdbID)}
          {...movie}
          disabled={props.disabled}
        />
      ))}
    </section>
  );
};

export default Results;

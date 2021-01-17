import React from "react";
import Movie from "./Movie";
import Pagination from "react-js-pagination";

import "../Style.css";

const Results = (props) => {
  let movies = props.results;
  console.log(props.pagination)
  return (
    <section className="results">
      <div className="results-for">
        <h3>Results for "{props.term}":</h3>
        <Pagination
          activePage={props.activePage}
          itemsCountPerPage={10}
          totalItemsCount={+props.pagination}
          pageRangeDisplayed={3}
          onChange={(pageNumber) => props.pageChange(pageNumber)}
        />
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

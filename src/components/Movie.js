import React from "react";
import "../Style.css";

const Movie = (props) => {
  let isDisabled = false;
  if (props.disabled.includes(props.imdbID)) {
    isDisabled = true;
  }
  return (
    <div className="result-movie">
      <div className="result-movie-title">{props.Title}</div>
      <div className="result-movie-year">({props.Year})</div>
      <button
        className="result-movie-btn"
        onClick={() => props.clicked()}
        disabled={isDisabled}
      >
        Nominate
      </button>
    </div>
  );
};

export default Movie;

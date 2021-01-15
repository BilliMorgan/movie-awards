import React from "react";
import "../Style.css";


const Movie = (props) => {

  return (
    <div className="result-movie">
      <div className="result-movie-title">{props.Title}</div>
      <div className="result-movie-year">({props.Year})</div>
      <div className="result-movie-btn" onClick={() => props.clicked()}>Nominate</div>
    </div>
  );
};

export default Movie;

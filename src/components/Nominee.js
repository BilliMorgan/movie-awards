import React from "react";
import "../Style.css";

const Nominee = (props) => {
  return (
    <div className="nominated-movie">
      {props.Poster === "N/A" ? (
        <div className="no-poster">
          <p>
            {props.Title}&nbsp;({props.Year})
          </p>
        </div>
      ) : (
        <img src={props.Poster} alt="movie poster" className="image" />
      )}
      <div className="overlay">
        <p className="text">
          {props.Title}&nbsp;({props.Year})
        </p>
        <button className="remove-btn" onClick={() => props.clicked()}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Nominee;

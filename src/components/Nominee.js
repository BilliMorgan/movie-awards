import React from "react";
import "../Style.css";

const Nominee = (props) => {
  return (
    <div className="nominated-movie">
      {props.Poster === "N/A" ? (
        <div className="no-poster">
          <p>
            {props.Title}({props.Year})
          </p>
        </div>
      ) : (
        <img src={props.Poster} alt="movie poster" className="image" />
      )}
      <div className="overlay">
        <div className="text">
          {props.Title}({props.Year})
        </div>
        <button className="remove-btn" onClick={() => props.clicked()}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Nominee;

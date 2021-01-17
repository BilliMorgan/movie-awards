import React from "react";
import Nominee from "../components/Nominee";
import "../Style.css";

const Nominations = (props) => {
  let nominees = props.nominated;
  let nominatedMovie = nominees.map((nominee) => (
        <Nominee key={nominee.imdbID} {...nominee} clicked={(nom) => props.clicked(nominee.imdbID)}/>
      ))
  return (
    <section className="nominations">
      {nominees.length === 0 ? (
        <h2>
          To find nominees, search your favourite movies and add them to the
          nominee list.
        </h2>
      ) : (
        nominatedMovie
      )}
    </section>
  );
};
export default Nominations;

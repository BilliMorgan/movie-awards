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
      <h1>Nominations</h1>
      {nominees.length === 0 ? <h2>Start by searching title to nominate your top 5 movies</h2> : nominatedMovie}
  
    </section>
  );
};
export default Nominations;

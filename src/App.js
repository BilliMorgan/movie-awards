import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nominations from "./components/Nominations";
import Search from "./components/Search";
import Results from "./components/Results";
import Error from "./components/Error";

import "./Style.css";

const App = (props) => {
  const [search, setSearch] = useState({
    term: "",
    results: [],
    loading: false,
  });

  const [nominees, setNominees] = useState([])

  // console.log(nominees);

  const [error, setError] = useState(false);

  const prev = useRef("");

  const showError = () => {
    setSearch({
      term: "",
      results: [],
      loading: false,
    });
    setError(true);
  };

  useEffect(() => {
    if (prev.current === "" && search.term === "") return;

    setSearch((prev) => ({
      ...prev,
      loading: true,
    }));

    prev.current = search.term;

    axios
      .get(
        `http://www.omdbapi.com/?apikey=8224ebbc&s=${search.term}&type=movie&page=1`
      )
      .then((response) => {
        if (response.data.Search) {
          setSearch((search) => ({
            ...search,
            results: response.data.Search,
            loading: false,
          }));
        } else {
          setSearch((search) => ({
            ...search,
            results: [],
            loading: false,
          }));
        }
      })
      .catch((error) => {
        console.log(`Error message: ${error}`);
        showError();
      });
  }, [search.term]);

  const addNominee = () => {
    console.log("cklicked")
    // let nominee = search.results.filter(result => result.imdbID === nomineeId)
    // setNominees(nominees => [...nominees, nominee])
  }

  return (
    <div className="row">
      <Nominations />
      <Search
        loading={search.loading}
        onSearch={(term) => setSearch({ ...search, term })}
      />

      {error ? (
        <Error onClose={(event) => setError(false)}>
          Error: Seems that the server is broken
        </Error>
      ) : null}

      {search.results.length !== 0 ? (
        <Results results={search.results} term={search.term} clicked={() => console.log("clicked")} />
      ) : null}
    </div>
  );
};



export default App;

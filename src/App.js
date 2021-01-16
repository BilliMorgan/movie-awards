import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nominations from "./components/Nominations";
import Search from "./components/Search";
import Results from "./components/Results";
import Pagination from "react-js-pagination";

// import Paginator from "./components/Paginator"
import Error from "./components/Error";
import "./Style.css";

const App = (props) => {
  const [search, setSearch] = useState({
    term: "",
    results: [],
    loading: false,
    pages: ""
  });
  const [nominees, setNominees] = useState([]);
  const [error, setError] = useState(false);
  const [activePage, setActivePage] = useState(1)
  
// console.log(search)
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
        `http://www.omdbapi.com/?apikey=8224ebbc&s=${search.term}&type=movie&page=${+activePage}`
      )
      .then((response) => {
        if (response.data.Search) {
          // console.log(response.data)

          let searchResults = [];
          response.data.Search.map((film) =>
            searchResults.push({
              Title: film.Title,
              Year: film.Year,
              imdbID: film.imdbID,
              Poster: film.Poster,
              nominated: false,
            })
          );

          setSearch((search) => ({
            ...search,
            results: searchResults,
            loading: false,
            pages: response.data.totalResults
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
  }, [search.term, activePage]);

  const addNominee = (nomineeId) => {
    let newNominee = search.results.filter(
      (result) => result.imdbID === nomineeId
    );
    newNominee[0].nominated = true;
    setNominees((nominee) => nominee.concat(newNominee));
  };

  const removeNominee = (removedNomineeId) => {
    setNominees(
      nominees.filter((result) => result.imdbID !== removedNomineeId)
    );
  };

  let disabledMovieID = [];
  nominees.map((nominee) => disabledMovieID.push(nominee.imdbID));

  let noBannerDisplay = (
    <>
      <Search
        loading={search.loading}
        onSearch={(term) => setSearch({ ...search, term })}
      />
      {search.results.length !== 0 ? (
        <Results
          results={search.results}
          term={search.term}
          clicked={(movieId) => addNominee(movieId)}
          disabled={disabledMovieID}
        />
      ) : null}
    </>
  );

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  return (
    <div className="row">
      <Nominations nominated={nominees} clicked={(nom) => removeNominee(nom)} />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={+search.pages}
        pageRangeDisplayed={3}
        onChange={(pageNumber) => handlePageChange(pageNumber)}
      />
      {nominees.length < 5 ? noBannerDisplay : "Banner"}

      {error ? (
        <Error onClose={(event) => setError(false)}>
          Error: Seems that the server is broken
        </Error>
      ) : null}
    </div>
  );
};

export default App;

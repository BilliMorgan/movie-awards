import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nominations from "./components/Nominations";
import Search from "./components/Search";
import Results from "./components/Results";
import Error from "./components/Error";
import Banner from "./components/Banner";
import "./Style.css";

const App = (props) => {
  const [search, setSearch] = useState({
    term: "",
    results: [],
    loading: false,
    pages: "",
  });
  const [nominees, setNominees] = useState([]);
  const [error, setError] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [closeBanner, setCloseBanner] = useState(false);

  // console.log(search)
  const prev = useRef("");

  const showError = () => {
    setSearch({
      term: "",
      results: [],
      loading: false,
      pages: "",
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
        `http://www.omdbapi.com/?apikey=8224ebbc&s=${search.term}&type=movie&page=${activePage}`
      )
      .then((response) => {
        if (response.data.Search) {
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
            pages: response.data.totalResults,
          }));
        } else {
          setSearch((search) => ({
            ...search,
            results: [],
            loading: false,
            pages: "",
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
    setCloseBanner(false);
  };

  let disabledMovieID = [];
  nominees.map((nominee) => disabledMovieID.push(nominee.imdbID));

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearch = (input) => {
    let term = input;
    setSearch({ ...search, term });
    if (prev.current !== term) {
      setActivePage(1);
    }
  };
  let noBannerDisplay = (
    <>
      <Search
        loading={search.loading}
        onSearch={(term) => handleSearch(term)}
      />
      {search.results.length !== 0 ? (
        <Results
          results={search.results}
          term={search.term}
          activePage={activePage}
          pagination={search.pages}
          pageChange={(pageNumber) => handlePageChange(pageNumber)}
          clicked={(movieId) => addNominee(movieId)}
          disabled={disabledMovieID}
        />
      ) : null}
    </>
  );

  return (
    
    <div className="row">
      <header>
        <h1>The Shoppies Nominees</h1>
      </header>
      <Nominations nominated={nominees} clicked={(nom) => removeNominee(nom)} />
      {nominees.length < 5 ? (
        noBannerDisplay
      ) : closeBanner ? null : (
        <Banner
          close={() => setCloseBanner(true)}
          //banner animation is not finished yet
          // show={!closeBanner}
        />
      )}
      {error ? (
        <Error onClose={(event) => setError(false)}>
          Error: Seems that the server is broken
        </Error>
      ) : null}
      <footer>
        <p>Copyright &copy; 2021 by Andrii Shymko. All right reserved.</p>
      </footer>
    </div>
  );
};

export default App;

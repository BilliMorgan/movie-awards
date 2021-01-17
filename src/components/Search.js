import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Spinner from "./Spinner";

import "../Style.css";

const Search = (props) => {
  const [value, setValue] = useState("");
  useDebounce(() => props.onSearch(value), 800);

  return (
    <section className="search">
      <ion-icon name="search-outline" className="search-ico"></ion-icon>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          spellCheck="false"
          // placeholder="Type movie title to find "
          name="search"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
      {props.loading ? <Spinner /> : null}
    </section>
  );
};
export default Search;

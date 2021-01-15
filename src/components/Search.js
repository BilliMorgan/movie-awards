import React, {useState} from "react";
import useDebounce from "../hooks/useDebounce";
import Spinner from "./Spinner"

import "../Style.css";




const Search = (props) => {
  const [value, setValue] = useState("");
  useDebounce(() => props.onSearch(value), 800)
  

  return (
    <section className="search">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          spellCheck="false"
          placeholder="Type movie title to find it"
          name="search"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
      {props.loading? <Spinner/> : null }
    </section>
  );
}
export default Search;
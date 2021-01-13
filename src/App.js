import React, {useEffect} from "react"
import Nominations from "./components/Nominations";
import Search from "./components/Search";
import Results from "./components/Results"
import './App.css';



const App = (props) => {
  const [search, setSearch] = useState({
    term: 
  })


  useEffect(() => {
    fetch("http://www.omdbapi.com/?apikey=8224ebbc&s=rambo&type=movie&page=1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


  return (
    <div className="App">
      <Nominations/>
      <Search/>
      <Results />
    </div>
  );
}

export default App;

// export default function MoviesIndex() {
//   return <p>Movie List</p>;
// }


import { Link} from "react-router-dom";
import { useEffect, useState } from "react";

import { getAllMovies } from "../../api/fetch";
import MovieListing from './MovieListing'

import ErrorMessage from "../errors/ErrorMessage";

import "../shows/ShowsIndex.css";


export default function ShowsIndex() {

  const [movies, setMovies] = useState([])
  const [loadingError, setLoadingError] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  function handleTextChange(event) {
    const title = event.target.value;
    const result = title.length ? filterMovies(title, allMovies) : allMovies;
  
    setSearchTitle(title);
    setMovies(result);
  }

  function filterMovies(search, movies) {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().match(search.toLowerCase());
    });
  }

  useEffect(() => {
    getAllMovies().then((response) => {
      setAllMovies(response);
      setMovies(response);
      setLoadingError(false);
    })
    .catch((error)=> {
    console.error(error); 
    setLoadingError(true);
  })
  },[])


  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {/* <!-- ShowListing components --> */}
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id}/>
            })}
          </section>
        </section>
      )}
    </div>
  );
}
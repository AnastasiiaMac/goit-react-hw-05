import css from "./MoviesPage.module.css";
import { IoMdSearch } from "react-icons/io";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { fetchMovieBySearchQuery } from "../../films-api";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchValue(query);
      getMovies(query);
    }
  }, [searchParams]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue === "") {
      setMovies([]);
      setSearchParams({});
      return;
    }
    setSearchParams({ query: trimmedSearchValue });
    getMovies(trimmedSearchValue);
  };
  const getMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovieBySearchQuery(query);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setError("Error fetching movies.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={css.container}>
        <form className={css.form} onSubmit={handleSearch}>
          <button className={css.button} type="submit">
            <IoMdSearch />
          </button>
          <input
            className={css.input}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            name="searchWord"
            placeholder="SearchMovies"
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>
      {loading && <Loader />}
      {!loading && !error && <MovieList movies={movies} />}
      {error && <p>Something went wrong. Please try again later.</p>}
    </div>
  );
};

export default MoviesPage;

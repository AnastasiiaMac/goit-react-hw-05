import css from "./MoviesPage.module.css";
import { IoMdSearch } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const MoviesPage = ({
  onSearch,
  searchResults,
  clearSearchResults,
  loading,
  error,
}) => {
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const searchQuery = form.elements.searchWord.value;
    if (searchQuery.trim() === "") {
      toast.error("Search field cannot be empty");
      return;
    }

    onSearch(searchQuery);
    setSearchInitiated(true);
    form.reset();
  };

  useEffect(() => {
    return () => {
      clearSearchResults();
      setSearchInitiated(false);
    };
  }, [clearSearchResults]);

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <IoMdSearch />
        </button>
        <input
          className={css.input}
          type="text"
          name="searchWord"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
      </form>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
      {loading && <Loader />}
      {!loading && searchInitiated && (
        <>
          {searchResults.length > 0 ? (
            <MovieList movies={searchResults} />
          ) : (
            <p>No movies found</p>
          )}
        </>
      )}
      {error && <p>Something went wrong. Please try again later.</p>}
    </div>
  );
};

export default MoviesPage;

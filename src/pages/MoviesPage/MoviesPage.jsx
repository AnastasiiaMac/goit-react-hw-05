import css from "./MoviesPage.module.css";
import { IoMdSearch } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const MoviesPage = ({ onSearch, searchResults, loading, error }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const searchQuery = form.elements.searchWord.value;
    if (searchQuery.trim() === "") {
      toast.error("Search field cannot be empty");

      return;
    }

    onSearch(searchQuery);

    form.reset();
  };

  return (
    <div>
      <div className={css.container}>
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
      </div>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
      {loading && <Loader />}
      {!loading && (
        <>{searchResults.length > 0 && <MovieList movies={searchResults} />}</>
      )}
      {error && <p>Something went wrong. Please try again later.</p>}
    </div>
  );
};

export default MoviesPage;

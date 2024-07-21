import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { fetchMovieBySearchQuery, fetchTrendingMovies } from "../../films-api";
import HomePage from "../../pages/HomePage/HomePage";
import { useEffect, useState, Suspense, lazy } from "react";
import Loader from "../Loader/Loader";

const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTopic, setSearchTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (searchQuery) => {
    setMovies([]);
    setSearchTopic(searchQuery);
  };

  useEffect(() => {
    if (searchTopic === "") {
      return;
    }
    async function getMovies() {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchMovieBySearchQuery(searchTopic);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [searchTopic]);

  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={
              <MoviesPage
                onSearch={handleSearch}
                searchResults={movies}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

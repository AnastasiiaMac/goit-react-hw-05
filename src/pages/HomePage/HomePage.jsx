import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../films-api";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setError(true);
      }
    };
    getTrendingMovies();
  }, []);
  return (
    <div>
      {error && <p>We does not have any trending movies for this date.</p>}
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;

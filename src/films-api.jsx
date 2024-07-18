import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWExMTY1M2NjYzRiMGIxMDY0OTQ4ZmNjMDZhM2E5MyIsIm5iZiI6MTcyMTIwNjAwOS42MDE0NTYsInN1YiI6IjY2OTY0ZDQxYzYyYjI5NTk0YWEzOGNjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f9Zd-22mkVDrxm_h8MB6HHA4CnVq99oF_1TvXTrR-cE";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

const fetchTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
const fetchMovieDetails = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export { fetchTrendingMovies, fetchMovieDetails };

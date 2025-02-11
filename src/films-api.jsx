import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWExMTY1M2NjYzRiMGIxMDY0OTQ4ZmNjMDZhM2E5MyIsIm5iZiI6MTcyMTIwNjAwOS42MDE0NTYsInN1YiI6IjY2OTY0ZDQxYzYyYjI5NTk0YWEzOGNjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f9Zd-22mkVDrxm_h8MB6HHA4CnVq99oF_1TvXTrR-cE";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

const fetchMovieCredits = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits", error);
    return null;
  }
};

const fetchMovieReviews = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews", error);
    return null;
  }
};

const fetchMovieBySearchQuery = async (searchQuery) => {
  const url = "https://api.themoviedb.org/3/search/movie";
  try {
    const response = await axios.get(url, {
      params: {
        query: searchQuery,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by search query", error);
    return null;
  }
};

export {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieBySearchQuery,
};

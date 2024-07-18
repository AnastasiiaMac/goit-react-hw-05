import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";

import Navigation from "../Navigation/Navigation";
import { fetchTrendingMovies } from "../../films-api";
import HomePage from "../../pages/HomePage/HomePage";
import { useEffect, useState } from "react";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      setTrendingMovies(data);
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage data={trendingMovies} />} />
        <Route path="/movies" element={<div>Movies Page</div>} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/:movieId/cast" element={<MovieCast />} />
        <Route
          path="/movies/:movieId/reviews"
          element={<MovieReviews />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../films-api";
import css from "./MovieDetailsPage.module.css";
import { NavLink, Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const getMovieDetails = async () => {
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;
  return (
    <div>
      <div className={css.container}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : alert("Image not found")
          }
          alt={movie.original_title}
          width="350"
          height="500"
        />
        <div>
          <h1>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <ul className={css.list}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

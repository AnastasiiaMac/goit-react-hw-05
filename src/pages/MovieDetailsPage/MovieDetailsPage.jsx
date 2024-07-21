import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../films-api";
import css from "./MovieDetailsPage.module.css";
import { NavLink, Outlet } from "react-router-dom";
import ImgNotFound from "../../assets/image-not-found.jpg";
import PreviousPage from "../../components/PreviousPage/PreviousPage";
import Loader from "../../components/Loader/Loader";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation();
  const initialLocationState = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        setError(true);
      }
    };
    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  if (!movie && !error) return <Loader />;

  return (
    <div>
      <PreviousPage />
      {error && <p>Failed to fetch movie details.</p>}
      {movie && (
        <div>
          <div className={css.container}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : ImgNotFound
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
          <h3 className={css.addInfoHeading}>Additional information</h3>
          <ul className={css.informationList}>
            <li>
              <NavLink to="cast" state={initialLocationState.current}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={initialLocationState.current}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;

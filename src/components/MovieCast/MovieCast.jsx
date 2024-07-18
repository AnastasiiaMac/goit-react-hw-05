import { useParams } from "react-router-dom";
import MovieCastItem from "../MovieCastItem/MovieCastItem";
import { useEffect, useState } from "react";
import { fetchMovieCredits } from "../../films-api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  useEffect(() => {
    const getMovieCredits = async () => {
      const movieCredits = await fetchMovieCredits(movieId);
      setActors(movieCredits.cast);
    };
    getMovieCredits();
  }, [movieId]);
  return (
    <div>
      <ul className={css.list}>
        {actors.map((actor) => {
          return (
            <li key={actor.id}>
              <MovieCastItem
                profile_path={actor.profile_path}
                name={actor.name}
                character={actor.character}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default MovieCast;

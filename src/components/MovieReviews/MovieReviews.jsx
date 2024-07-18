import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../films-api";
import MovieReviewsItem from "../MovieReviewsItem/MovieReviewsItem";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getMovieReviews = async () => {
      const movieReviews = await fetchMovieReviews(movieId);
      setReviews(movieReviews.results);
    };
    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {reviews.length === 0 && <p>Sorry,no reviews</p>}
      <ul className={css.list}>
        {reviews.map((review) => {
          return (
            <li key={review.id}>
              <MovieReviewsItem
                author={review.author}
                username={review.author_details.username}
                review={review.content}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default MovieReviews;

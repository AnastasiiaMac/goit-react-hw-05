import css from "./MovieReviwsItem.module.css";
const MovieReviewsItem = ({ author, username, review }) => {
  return (
    <div>
      <p className={css.author}>{author}</p>
      <p className={css.username}>Username:{username}</p>
      <p>{review}</p>
    </div>
  );
};
export default MovieReviewsItem;

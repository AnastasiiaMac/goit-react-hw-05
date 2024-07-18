import imgNotFound from "../../assets/image-not-found.jpg";
import css from "./MovieCastItem.module.css";
const MovieCastItem = ({ profile_path, name, character }) => {
  return (
    <>
      <img
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w300/${profile_path}`
            : imgNotFound
        }
        alt="no image"
        height={200}
      />
      <div className={css.imageText}>
        <p>{name}</p>
        <p>Charecter: {character}</p>
      </div>
    </>
  );
};
export default MovieCastItem;

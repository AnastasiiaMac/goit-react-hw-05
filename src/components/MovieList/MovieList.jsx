import { Link } from "react-router-dom";

const MovieList = ({ name, id }) => {
  return (
    <div>
      <Link to={`/movies/${id}`}>{name}</Link>
    </div>
  );
};
export default MovieList;

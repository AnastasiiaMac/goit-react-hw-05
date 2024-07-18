import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ data }) => {
  return (
    <ul>
      {data.map((datum) => {
        return (
          <li key={datum.id}>
            <MovieList id={datum.id} name={datum.title} />
          </li>
        );
      })}
    </ul>
  );
};
export default HomePage;

import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ data }) => {
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default HomePage;

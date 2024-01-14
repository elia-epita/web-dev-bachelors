import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import {
  getMovies,
  getMoviesErrors,
  getMoviesStatus,
  selectAllMovies,
} from "../features/movie/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../hooks/useApi";

const HomePage = () => {
  const dispatch = useDispatch();

  const { data } = useApi("http://localhost:8080/movies");
  console.log(data);
  const movies = useSelector(selectAllMovies);
  const status = useSelector(getMoviesStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMovies());
    }
  }, [dispatch, status]);

  return (
    <div
      className="page"
      style={{ backgroundColor: "#111", overflow: "hidden" }}
    >
      <Navbar />
      <Banner />
      <Row
        title="Netflix Originals"
        movies={movies["Netflix Originals"]}
        isLarge={true}
      />
      <Row title="Top Rated" movies={movies["Top Rated"]} />
      <Row title="Trending" movies={movies.Trending} />
      <Row title="Horror" movies={movies.Horror} />
      <Row title="Romance" movies={movies.Romance} />
      <Row title="Comedy" movies={movies.Comedy} />
      <Row title="Documentaries" movies={movies.Documentaries} />
    </div>
  );
};

export default HomePage;

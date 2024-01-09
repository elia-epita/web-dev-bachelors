import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import axios from "../constants/axios";
import { requests } from "../constants/requests";

const HomePage = () => {
  const [movies, setMovies] = useState({
    "Top Rated": [],
    Trending: [],
    Horror: [],
    Romance: [],
    Comedy: [],
    "Netflix Originals": [],
    Documentaries: [],
  });

  useEffect(() => {
    const fetchData = () => {
      const request = axios
        .get(requests.fetchAllMovies)
        .then((movies) => {
          console.log(movies.data);
          setMovies(movies.data.movies);
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    };
    fetchData();
  }, []);

  return (
    <div
      className="page"
      style={{ backgroundColor: "#111", overflow: "hidden" }}
    >
      <Navbar />
      <Banner />
      <Row title="Netflix Originals" movies={movies["Netflix Originals"]} isLarge={true}/>
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

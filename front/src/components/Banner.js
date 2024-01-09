import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import axios from "../constants/axios";
import Youtube from "react-youtube";
import { requests } from "../constants/requests";
import "../styles/Banner.css";

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Banner = () => {
  const [movie, setMovie] = useState({
    backdrop_poster: "",
    title: "",
    overview: "",
    release_date: "",
  });
  const [trailerURL, setTrailerURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = axios
        .get(requests.fetchNetflixOriginals)
        .then((response) => {
          setMovie(
            response.data.movies[
              Math.floor(Math.random() * (response.data.movies.length - 1))
            ]
          );
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    };

    fetchData();
  }, []);

  const truncate = (str, nbr) => {
    return str?.length > nbr ? str.substr(0, nbr - 1) + "..." : str;
  };

  const handlePlayClick = (event) => {
    event.preventDefault();

    // Here we make the call to add the movie to seen movies

    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(movie.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(url, urlParams);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundImage: `url("${movie.backdrop_poster}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">{movie.title}</h1>
          <div className="banner_buttons">
            <button
              className="banner_button"
              onClick={(event) => handlePlayClick(event)}
            >
              Play
            </button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_release_date">
            {movie.release_date
              ? new Date(movie?.release_date).toISOString().split("T")[0]
              : ""}
          </h1>
          <span className="banner_description">
            {truncate(movie.overview, 150)}
          </span>
        </div>
        <div className="fade"></div>
      </header>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
};

export default Banner;

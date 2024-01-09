import movieTrailer from "movie-trailer";
import React, { useState } from "react";
import Youtube from "react-youtube";
import { useNavigate } from "react-router-dom";
import "../styles/Row.css";

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Row = ({ title, movies, isLarge }) => {
  const [trailerURL, setTrailerURL] = useState("");
  const [movie, setMovie] = useState({});
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

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

  const handleViewClick = (event) => {
    event.preventDefault();
    navigate(`/movie/${movie.movie_id}`, { state: { movie: movie } });
  };

  const handleMovieClick = (event, movie) => {
    event.preventDefault();
    setMovie(movie);

    if (trailerURL) {
      setTrailerURL("");
    }

    setShowBanner(!showBanner);
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies === undefined || movies.length === 0 ? (
          <span>No Movies Found</span>
        ) : (
          movies.map((movie) => (
            <img
              key={movie.movie_id}
              className={`row_poster ${isLarge && "row_posterLarge"}`}
              onClick={(event) => handleMovieClick(event, movie)}
              src={isLarge ? movie.poster : movie.backdrop_poster}
              alt={movie.title}
            />
          ))
        )}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
      {showBanner && (
        <div className="movie_options">
          <button
            className="movie_button"
            onClick={(event) => handlePlayClick(event)}
          >
            Play
          </button>
          <button className="movie_button" onClick={(event) => handleViewClick(event)}>
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default Row;

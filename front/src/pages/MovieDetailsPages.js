import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../constants/axios";
import { requests } from "../constants/requests";
import Banner from "../components/Banner";
import Comment from "../components/Comment";
import CommentBox from "../components/CommentBox";
import "../styles/MovieDetailsPage.css";
import { dummyComments } from "../constants/commentsData";
import Navbar from "../components/Navbar";

const MovieDetailsPages = () => {
  const params = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const request = axios
        .get(`${requests.fetchMovieComments}${params.movie_id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    };

    fetchData();
  }, [params.movie_id]);

  return (
    <div className="movie-page">
      <Navbar />
      <Banner />
      <div className="comment-section">
        <h2 className="reviews">Comments & Reviews</h2>
        <div className="movie-page-bottom">
          <div className="comments">
            {dummyComments.length === 0 ? (
              <div className="no-comments-message">
                <span>No Comments</span>
              </div>
            ) : (
              dummyComments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))
            )}
          </div>
          <CommentBox />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPages;

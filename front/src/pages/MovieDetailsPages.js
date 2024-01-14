import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import Comment from "../components/Comment";
import CommentBox from "../components/CommentBox";
import Navbar from "../components/Navbar";
import axios from "../constants/axios";
import { requests } from "../constants/requests";
import "../styles/MovieDetailsPage.css";
import useApi from "../hooks/useApi";

const MovieDetailsPages = (props) => {
  const params = useParams();
  const location = useLocation();

  const [comments, setComments] = useState([]);

  const { data } = useApi(`http://localhost:8080/comments/${params.movie_id}`);
  console.log("COMMENTS DATA=", data);

  useEffect(() => {
    const fetchData = () => {
      const request = axios
        .get(`${requests.fetchMovieComments}${params.movie_id}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        .then((response) => {
          setComments(response.data.comments);
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    };

    fetchData();
  }, [params.movie_id]);

  const handleAddComment = (data) => {
    axios
      .post(`${requests.addMovieComment}${params.movie_id}`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((response) => {
        setComments([...comments, data]);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="movie-page">
      <Navbar />
      <Banner movieDetails={location.state.movie} />
      <div className="comment-section">
        <h2 className="reviews">Comments & Reviews</h2>
        <div className="movie-page-bottom">
          <div className="comments">
            {comments.length === 0 ? (
              <div className="no-comments-message">
                <span>No Comments</span>
              </div>
            ) : (
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))
            )}
          </div>
          <CommentBox addComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPages;

import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import "../styles/CommentBox.css";

const CommentBox = ({ addComment }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = JSON.parse(localStorage.getItem("user")).username;
    addComment({ title, comment, rating, username });
  };

  return (
    <div className="comment-box-container">
      <h2 className="detail-title">Add Review</h2>
      <div className="comment-form">
        <form
          className="form"
          name="form"
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-row">
            <input
              className="input"
              value={title}
              placeholder="Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-row">
            <textarea
              className="input"
              value={comment}
              placeholder="Add comment..."
              required
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <StarRatings
            rating={rating}
            starRatedColor="red"
            changeRating={(rating) => setRating(rating)}
            starDimension="40px"
            starSpacing="15px"
          />
          <div className="form-row">
            <input
              type="submit"
              value="Add Comment"
              onClick={(e) => handleSubmit(e)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentBox;

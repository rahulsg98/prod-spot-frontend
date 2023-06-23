import React, { useEffect, useState } from "react";
import "./CommentBox.css";
import arrowSubmit from "../../../../../assets/arrowSubmit.png";
import axios from "axios";
import BASEURL from "../../../../../constants/base";

const CommentBox = ({ id, commentCnt, setCommentCnt }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASEURL}/comments`, {
        params: { productId: id },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNotes();
    }
  };

  const handleSaveNotes = () => {
    if (!comment.trim()) {
      return;
    }
    const data = {
      productId: id,
      commentText: comment,
    };

    axios
      .post(`${BASEURL}/comments`, data)
      .then((res) => {
        setCommentCnt(commentCnt + 1);
        setComments([...comments, res.data]);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="comment-box">
      <div className="add-comment-bar">
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          onKeyDown={handleKeyDown}
        />
        <img src={arrowSubmit} alt="addComment" onClick={handleSaveNotes} />
      </div>
        <div className="comments-section">
          {comments.map((item, index) => (
            <div className="one-comment">
              <div className="blueDot"></div>
              <span key={index}>{item.commentText}</span>
            </div>
          ))}
        </div>
    </div>
  );
};

export default CommentBox;
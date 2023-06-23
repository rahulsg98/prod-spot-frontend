import React, { useState } from "react";
import "./ProductCard.css";
import comment1 from "../../../../assets/comment1.png";
import comment2 from "../../../../assets/comment2.png";
import upArrow from "../../../../assets/upArrow.png";
import CommentBox from "./CommentBox/CommentBox";
import useProductContext from "../../../../context/useProductContext";
import axios from "axios";
import BASEURL from "../../../../constants/base";

const ProductCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullDescription, setFullDescription] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likes);
  const { setEditPopup, loggedIn, setPopup, setEditId } = useProductContext();
  const [commentCnt, setCommentCnt] = useState(data.commentCount);

  const showComments = () => {
    setIsOpen(!isOpen);
  };

  const increaseLike = async () => {
    try {
      const response = await axios.put(`${BASEURL}/products/${data._id}/like`);
      setLikeCount(response.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const showFullDescription = () => {
    setFullDescription(!fullDescription);
  };

  const openPopup = () => {
    setEditPopup(true);
    setPopup(true);
    setEditId(data._id);
  };

  return (
    <div className="product-card-container">
      <div className="product-card">
        <div className="product-card-img">
          <img src={data.imageURL} alt="product" />
        </div>
        <div className="product-card-content">
          <span>{data.companyName}</span>
          <span
            className={`product-card-description ${
              fullDescription ? "expanded" : ""
            }`}
            onClick={showFullDescription}
          >
            {data.description}
          </span>
          <div className="product-card-last-section">
            <div className="product-card-category">
              {data.category.map((category, index) => (
                <span key={index}>{category}</span>
              ))}
            </div>
            <div className="product-card-comment" onClick={showComments}>
              <img src={comment1} alt="comment" />
              <span>Comment</span>
            </div>
            {loggedIn && (
              <button
                className="product-card-edit-button"
                onClick={openPopup}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="product-card-right">
          <div className="product-card-likes">
            <img onClick={increaseLike} src={upArrow} alt="upArrow" />
            <span>{likeCount}</span>
          </div>
          <div className="product-card-comments">
            <span>{commentCnt}</span>
            <img src={comment2} alt="comment" />
          </div>
        </div>
      </div>
      {isOpen ? <CommentBox commentCnt={commentCnt} setCommentCnt={setCommentCnt} id={data._id} /> : null}
    </div>
  );
};

export default ProductCard;

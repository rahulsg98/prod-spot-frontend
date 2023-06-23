import React from "react";
import "./PopupBanner.css";
import useProductContext from "../../../context/useProductContext";

const PopupBanner = () => {
  const { setPopup } = useProductContext();

  const onClose = () => {
    setPopup(false);
  };
  return (
    <div className="popup-side-content">
      <span onClick={onClose}>X</span>
      <span>Feedback</span>
      <span>Add your products here and rate other items.......</span>
    </div>
  );
};

export default PopupBanner;
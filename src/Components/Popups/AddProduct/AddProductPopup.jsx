import React from "react";
import "./AddProductPopup.css";
import AddProductForm from "../../Forms/AddProductForm/AddProductForm";
import PopupBanner from "../PopupBanner/PopupBanner";

const AddProductPopup = () => {
  return (
    <div className="add-product-popup">
      <AddProductForm />
      <PopupBanner />
    </div>
  );
};

export default AddProductPopup;
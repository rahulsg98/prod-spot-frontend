import React from "react";
import "./EditProductPopup.css";
import EditProductForm from "../../Forms/EditProductForm/EditProductForm";
import PopupBanner from "../PopupBanner/PopupBanner";

const EditProductPopup = () => {
  return (
    <div className="edit-product-popup">
      <EditProductForm />
      <PopupBanner />
    </div>
  );
};

export default EditProductPopup;
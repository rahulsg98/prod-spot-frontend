import React, { useEffect, useState } from "react";
import "./AddProductForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useProductContext from "../../../context/useProductContext";
import BASEURL from "../../../constants/base";

const AddProductForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [productLink, setProductLink] = useState("");
  const [description, setDescription] = useState("");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const { setPopup, setLoggedIn, setSignupPopup } = useProductContext();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);   
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const categoryItem = e.target.value.split(",").map((item) => item);
    setCategory(categoryItem);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleProductLinkChange = (e) => {
    setProductLink(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      companyName,
      category: category.map((item) => item.trim()),
      imageURL,
      productLink,
      description,
    };

    try {
      if (
        !data.companyName ||
        !data.category ||
        !data.imageURL ||
        !data.productLink ||
        !data.description
      ) {
        toast.error("Please fill all the fields", {
          position: "top-center",
          autoClose: 1000,
        });
        return;
      }
      await axios.post(`${BASEURL}/products`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCompanyName("");
      setCategory("");
      setImageURL("");
      setProductLink("");
      setDescription("");

      toast.success("Product Added Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      setTimeout(() => {
        setPopup(false);
      }, 1000);
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("Please login to add product", {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          setPopup(true);
          setSignupPopup(false);
          setLoggedIn(false);
        }, 1000);

        return;
      }
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <form className="add-product">
        <div className="add-product-heading">
          {innerWidth < 600 ? <span>Add your product</span> : null}
        </div>
        <div className="add-product-company-input">
          <input
            value={companyName}
            onChange={handleCompanyNameChange}
            type="text"
            placeholder="Name of your company"
          />
        </div>
        <div className="add-product-category-input">
          <input
            value={category}
            onChange={handleCategoryChange}
            type="text"
            placeholder="Category"
          />
        </div>
        <div className="add-product-logo-input">
          <input
            value={imageURL}
            onChange={handleImageURLChange}
            type="text"
            placeholder="Add logo URL"
          />
        </div>
        <div className="add-product-product-link-input">
          <input
            value={productLink}
            onChange={handleProductLinkChange}
            type="text"
            placeholder="Link of product"
          />
        </div>
        <div className="add-product-description-input">
          <input
            value={description}
            onChange={handleDescriptionChange}
            type="text"
            placeholder="Description"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="add-product-button"
        >
          +Add
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProductForm;

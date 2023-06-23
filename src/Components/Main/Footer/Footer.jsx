import React, { useEffect, useState } from "react";
import "./Footer.css";
import ProductCard from "./ProductCard/ProductCard";
import Filter from "./CategoryFilter/CategoryFilter";
import SearchBar from "./SearchBar/SearchBar";
import useProductContext from "../../../context/useProductContext";
import SignupPopup from "../../Popups/Register/RegisterPopup";
import LoginPopup from "../../Popups/Login/LoginPopup";
import AddProductPopup from "../../Popups/AddProduct/AddProductPopup";
import EditProductPopup from "../../Popups/EditProduct/EditProductPopup";
import axios from "axios";
import BASEURL from "../../../constants/base";

const Footer = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const {
    products,
    setProducts,
    popup,
    setPopup,
    signupPopup,
    loggedIn,
    selected,
    setCategory,
    selectedCategory,
    category,
    editPopup,
  } = useProductContext();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("signup-popup-overlay")) {
      setPopup(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [selected, popup, selectedCategory]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${BASEURL}/products`, {
        params: {
          sortBy: selected,
          category: selectedCategory.join(","),
        },
      });
      setProducts(response.data);
      if (category.length === 0) {
        uniqueCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uniqueCategories = (products) => {
    const categories = [];
    products.forEach((product) => {
      product.category.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });
    setCategory(categories);
  };

  return (
    <div className="footer">
      <div className="footer-left">
        <Filter />
      </div>
      <div className="footer-right">
        <SearchBar />
        {innerWidth < 500 && <Filter />}

        {products.length === 0 ? (
          <h1>No Product Available</h1>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} data={product} />
          ))
        )}
      </div>

      {popup && (
        <div className="signup-popup-overlay" onClick={handleOverlayClick}>
          {loggedIn ? (
            editPopup ? (
              <EditProductPopup />
            ) : (
              <AddProductPopup />
            )
          ) : signupPopup ? (
            <SignupPopup />
          ) : (
            <LoginPopup />
          )}
        </div>
      )}
    </div>
  );
};

export default Footer;

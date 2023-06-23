import React from "react";
import "./CategoryFilter.css";
import useProductContext from "../../../../context/useProductContext";

const CategoryFilter = () => {
  const { category, selectedCategory, setSelectedCategory } =
    useProductContext();

  const handleCategorySelection = (category) => {
    const singleCategory = category.target.innerText;
    if (selectedCategory.includes(singleCategory)) {
      setSelectedCategory(
        selectedCategory.filter((category) => category !== singleCategory)
      );
    } else {
      setSelectedCategory([...selectedCategory, singleCategory]);
    }
  };

  return (
    <div className="category-filter">
      <div className="filter-banner">
        <span>Feedback</span>
        <span>Apply Filter</span>
      </div>
      <div className="filter-items-list">
        <span
          className={selectedCategory.length === 0 ? "selected" : ""}
          onClick={() => setSelectedCategory([])}
        >
          All
        </span>
        {category.map((category, index) => (
          <span
            key={index}
            onClick={handleCategorySelection}
            className={selectedCategory.includes(category) ? "selected" : ""}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

import React from "react";
import { Link } from "react-router-dom";
import "./CategoriesItems.css";

const CategoriesItems = ({ image, title, id, isHomePage }) => {
  const baseUrl = "http://localhost:3333";

  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  console.log(`Rendering category ${id}: image URL = ${fullImageUrl}`); 
  return (
    <Link to={`/category/${id}`} className="category-item">
      <div className="image-wrapper">
        <img
          src={fullImageUrl}
          alt={title || "Category"}
          className="category-image"
          onError={(e) => {
            console.error(`Failed to load image for category ${id}: ${e.target.src}`);
            e.target.src = "/images/fallback.jpeg"; 
          }}
          onLoad={() => console.log(`Image loaded for category ${id}`)}
        />
      </div>
      <p className="category-name-outside">{title || "No title"}</p>
    </Link>
  );
};

export default CategoriesItems;
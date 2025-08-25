import React from "react";
import "./CategoriesItems.css"; 

const CategoriesItems = ({ image, title, count, isHomePage }) => {
        return (
            <div className="category-item">
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>Items: {count}</p>
                </div>
    );
};

export default CategoriesItems;
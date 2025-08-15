import React from "react";

const CategoriesItems = ({ image, title, count = null, isHomePage = true }) => {
    if (isHomePage) {
        return <p>{title}</p>;
    }
    return (
            <div className="category-item">
                <img src={image} alt={title} />
                <p>{title}</p>
                </div>
    );
};

export default CategoriesItems;
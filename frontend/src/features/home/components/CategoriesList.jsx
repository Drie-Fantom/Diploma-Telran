import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@redux/slices/categorySlice";
import CategoriesItems from "./CategoriesItems.jsx";
import "./CategoriesList.css";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories || { items: [], status: 'idle', error: null });

  useEffect(() => {
    console.log('Dispatching fetchCategories...');
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log('Redux state:', { items, status, error });

  
  const fallbackCategories = [
    { id: 1, title: "Annuals", image: "/category_img/1.jpeg" },
    { id: 2, title: "Nursery", image: "/category_img/2.jpeg" },
    { id: 3, title: "Garden Art", image: "/category_img/3.jpeg" },
    { id: 4, title: "Plant Care", image: "/category_img/4.jpeg" },
  ];

  const categoriesToShow = items.length > 0 ? items.slice(0, 4) : fallbackCategories;

  return (
    <div className="categories-section">
      <div className="category-title-block">
        <h2 className="category-title">Categories</h2>
        <div className="category-line-block">
          <span className="category-line"></span>
          <div className="all-categories-desktop">
            <a href="/categories" className="all-categories-btn">
              All categories
            </a>
          </div>
        </div>
      </div>
      <div className="category-wrapper">
        <div className="categories-list-container">
          {status === 'loading' && <p>Loading categories...</p>}
          {status === 'failed' && <p>Error: {error || 'Failed to load categories'}</p>}
          {categoriesToShow.length > 0 ? (
            categoriesToShow.map((category) => (
              <CategoriesItems
                key={category.id}
                id={category.id}
                image={category.image}
                title={category.title}
                isHomePage={true}
              />
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <div className="all-categories-mobile">
          <a href="/categories" className="all-categories-btn">
            All categories
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
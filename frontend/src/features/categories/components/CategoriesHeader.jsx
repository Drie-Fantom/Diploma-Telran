import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '@redux/slices/categorySlice.js';
import { Link } from "react-router-dom";
import './CategoriesHeader.css';

const CategoriesHeader = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="categories-header">
            <h2 className="categories-title">Categories</h2>
            <hr className="separator-line" />
            <Link to="/categories" className="all-categories-btn">
             All Categories 
            </Link>
        </div>
    );
};

export default CategoriesHeader;
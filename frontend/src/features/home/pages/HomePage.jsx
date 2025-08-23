import React from 'react';
import ProductOfDayModal from '../components/ProductOfDayModal.jsx';
import CategoriesList from '../components/CategoriesList';
import DiscountBlock from '../components/DiscountForm/DiscountBlock.jsx';
import "@styles/categories.css";

const HomePage = () => (
  <section className="home">
    <div className="home__container">
    <h1>Welcome to Garden Products</h1>
    <ProductOfDayModal />
    <DiscountBlock />
    <CategoriesList />
    </div>
  </section>
);

export default HomePage;

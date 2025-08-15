import React from 'react';
import ProductOfDayModal from '../components/ProductOfDayModal.jsx';
import CategoriesList from '../components/CategoriesList';
import "@styles/categories.css";

const HomePage = () => (
  <section>
    <h1>Welcome to Garden Products</h1>
    <ProductOfDayModal />
    <CategoriesList />
  </section>
);

export default HomePage;

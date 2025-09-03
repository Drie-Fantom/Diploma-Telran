import React from 'react';
import ProductOfDayModal from '../components/ProductOfDayModal.jsx';
import CategoriesList from '../components/CategoriesList';
import styles from './HomePage.module.css';
import DiscountBlock from '../components/DiscountForm/DiscountBlock.jsx';
import ProductCard from '../../products/components/ProductCard';
import "@styles/categories.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles['hero-text']}>
            <h1>
              Amazing Discounts<br />
              on Garden Products!
            </h1>
            <button type="button" className={styles['btn-checkout']}>
              <span className={styles['btn-checkout__text']}>Check out</span>
            </button>
          </div>
</div>
      </section>


  <section className="home">
    <div className="home__container">
      <h1>Welcome to Garten Products</h1>
      <ProductOfDayModal />
      <DiscountBlock />
      <CategoriesList />
      <h2>Random Discounted Products</h2>
      <div className='discounted-products'>
        <ProductCard product={{
          id: 1,
          title: 'Sample Product',
          price: 240,
          discont_price: 199,
          image: "/product_img/sample.jpg" 
        }} />
    </div>
    </div>
  </section>
    </>
);
}

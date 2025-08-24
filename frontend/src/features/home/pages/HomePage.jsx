import React from 'react';
import ProductOfDayModal from '../components/ProductOfDayModal.jsx';
import styles from './HomePage.module.css';
import DiscountBlock from '../components/DiscountForm/DiscountBlock.jsx';

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
          <DiscountBlock />
        </div>
      </section>

      {/* <ProductOfDayModal /> */}
    </>
  );
}

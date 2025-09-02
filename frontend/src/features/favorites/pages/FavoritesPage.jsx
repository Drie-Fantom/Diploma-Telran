import React from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@features/products/components/ProductCard.jsx';
import { selectFavoriteIds } from '@redux/slices/favoritesSlice.js';
import { fetchProducts } from '@redux/slices/productSlice.js';
import styles from '@features/products/pages/ProductsPage.module.css';

export default function FavoritesPage() {
  const dispatch = useDispatch();

  const favoriteIds = useSelector(selectFavoriteIds);
  const { items: products = [], status = 'idle', error } = useSelector(s => s.products);
  const favSet = useMemo(() => new Set(favoriteIds.map(String)), [favoriteIds]); // Memoize the favorite IDs

  const favoriteProducts = useMemo( // Memoize the filtered favorite products
    () => products.filter(p => favSet.has(String(p.id))),
    [products, favSet]
  );

  useEffect(() => {
    dispatch(fetchProducts({})); // Fetch all products to ensure favorites are up-to-date
  }, [dispatch]);

  if (favoriteIds.length === 0) { // If there are no favorite IDs
    return (
      <div className={styles.product}>
        <h2>Favorites</h2>
        <p>The list is empty.</p>
      </div>
    );
  }

  if (status === 'loading' && products.length === 0) { // If loading and no products
    return (
      <div className={styles.product}>
        <h2>Favorites</h2>
        <p>Loading…</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={styles.product}>
        <h2>Favorites</h2>
        <p>Failed to load products{error ? `: ${error}` : ''}.</p>
      </div>
    );
  }

  return (
    <div className={styles.product}>
      <h2>Favorites ({favoriteProducts.length})</h2>
      <div className={styles.productGrid}>
        {favoriteProducts.map(prod => (
          <ProductCard key={prod.id} product={prod} /> // Render only favorite products
        ))}
      </div>
    </div>
  );
}

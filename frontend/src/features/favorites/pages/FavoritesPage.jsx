import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@features/products/components/ProductCard.jsx';
import { selectFavoriteIds } from '@redux/slices/favoritesSlice.js';
import { fetchProducts } from '@redux/slices/productSlice.js';
import styles from '@features/products/pages/ProductsPage.module.css';
import TitleList from "@common/components/ui/title/TitleList.jsx";
import SceletonGrid from '@common/components/ui/sceleton/SceletonGrid.jsx';

export default function FavoritesPage() {
  const dispatch = useDispatch();

  const favoriteIds = useSelector(selectFavoriteIds);
  const { items: products = [], status = 'idle', error } = useSelector(s => s.products);

  const favSet = new Set(favoriteIds.map(String));
  const favoriteProducts = products.filter(p => favSet.has(String(p.id))); // filtered favorites

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts({})); // Fetch all products to ensure favorites are up-to-date
  }, [status, dispatch]);

  // Sceleton loading state
  const isFirstLoad = (status === 'idle' || status === 'loading') && products.length === 0;

  if (favoriteIds.length === 0) { // If there are no favorite IDs
    return (
      <div className={styles.product}>
        <h2>Favorites</h2>
        <p>The list is empty.</p>
      </div>
    );
  }

  // Убрано «Loading…», чтобы отрисовался скелетон при первой загрузке
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
      <TitleList title={`Liked products`} />
      <div className={styles.productGrid}>
        {isFirstLoad
          ? <SceletonGrid count={Math.min(favoriteIds.length, 12)} />
          : favoriteProducts.map(prod => <ProductCard key={prod.id} product={prod} />) // Render only favorite products
        }
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '@redux/slices/productSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import { Loader } from '@common/components';
import SceletonGrid from '@common/components/ui/sceleton/SceletonGrid.jsx';
import styles from './ProductsPage.module.css';
import FilterSortControls from '../../filterSort/FilterSortControls.jsx';
import Title from '@common/components/ui/title/Title.jsx';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, status } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);

  const [params, setParams] = useState({
    minPrice: '',
    maxPrice: '',
    discounted: false,
    sort: 'default',
  });

  const isFirstLoad = status === 'loading' && items.length === 0;

  const handleControlsChange = (next) => {
    setParams(prev => ({ ...prev, ...next }));
  };

  useEffect(() => {
    dispatch(fetchProducts({ categoryId: id, ...params }));
  }, [dispatch, id, params]);

 
  let filteredSortedItems = [...items];

  if (id) {
    filteredSortedItems = filteredSortedItems.filter(p => p.categoryId === Number(id));
  }

  if (params.minPrice) {
    filteredSortedItems = filteredSortedItems.filter(p => p.price >= Number(params.minPrice));
  }
  if (params.maxPrice) {
    filteredSortedItems = filteredSortedItems.filter(p => p.price <= Number(params.maxPrice));
  }
  if (params.discounted) {
    filteredSortedItems = filteredSortedItems.filter(p => p.discont_price);
  }

  const getPrice = (p) => (p.discont_price ?? p.price);

  if (params.sort === 'price_asc') {
    filteredSortedItems.sort((a, b) => getPrice(a) - getPrice(b));
  }
  if (params.sort === 'price_desc') {
    filteredSortedItems.sort((a, b) => getPrice(b) - getPrice(a));
  }
  if (params.sort === 'name_asc') {
    filteredSortedItems.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (params.sort === 'name_desc') {
    filteredSortedItems.sort((a, b) => b.title.localeCompare(a.title));
  }

  let pageTitle = 'Products';
  if (id) {
    const cat = categories.find(c => c.id === Number(id));
    pageTitle = cat ? cat.title : 'Products';
  }

  return (
    <div className={styles.product}>
      <Title text={pageTitle} />

      <div className={styles.filterSection}>
        <FilterSortControls onChange={handleControlsChange} />
      </div>

      <div className={styles.productGrid}>
        {isFirstLoad ? (
          <SceletonGrid count={12} />
        ) : status === 'loading' ? (
          <Loader />
        ) : (
          filteredSortedItems.slice(0, 35).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

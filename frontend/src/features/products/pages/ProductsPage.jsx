import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '@redux/slices/productSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import { Loader } from '@common/components';
import styles from './ProductsPage.module.css';
import PriceRange from '../../filterSort/PriceRange.jsx';
import DiscountedFilter from '../../filterSort/DiscountedFilter.jsx';
import SortComponent from '../../filterSort/SortComponent.jsx';


const ProductsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, status } = useSelector(state => state.products);

  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', discounted: false });
  const [sort, setSort] = useState('default');

  useEffect(() => {
    dispatch(fetchProducts({categoryId: id, ...filters, sort }));
  }, [dispatch, id, filters, sort]);

  if (status === 'loading' && items.length === 0) return <Loader />;

  let filteredSortedItems = [...items];

  if (id) filteredSortedItems = filteredSortedItems.filter(p => p.categoryId === Number(id));

  if (filters.minPrice) filteredSortedItems = filteredSortedItems.filter(p => p.price >= Number(filters.minPrice));
  if (filters.maxPrice) filteredSortedItems = filteredSortedItems.filter(p => p.price <= Number(filters.maxPrice));
  if (filters.discounted) filteredSortedItems = filteredSortedItems.filter(p => p.discont_price);

  if (sort === 'price_asc') filteredSortedItems.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') filteredSortedItems.sort((a, b) => b.price - a.price);
  if (sort === 'name_asc') filteredSortedItems.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'name_desc') filteredSortedItems.sort((a, b) => b.title.localeCompare(a.title));

  const handlePriceChange = (prices) => {
    setFilters(prev => ({ ...prev, ...prices }));
  };

  const handleDiscountedChange = (checked) => {
    setFilters(prev => ({ ...prev, discounted: checked }));
  };

  return (
    <div className={styles.product}>
      <div className={styles.filterSection}>
        <PriceRange onPriceChange={handlePriceChange} />
        <DiscountedFilter onDiscountedChange={handleDiscountedChange} />
        <SortComponent onSortChange={setSort} />
      </div>
      <div className={styles.productGrid}>
        {filteredSortedItems.slice(0, 35).map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
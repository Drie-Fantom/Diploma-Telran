import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@redux/slices/productSlice.js';

import styles from './SaleSection.module.css';
import ProductCardMain from '@/common/components/layout/ProductCardMain';
import TitleList from '@common/components/ui/title/TitleList.jsx';

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const discountItems = items.filter(p => p.discont_price && p.discont_price < p.price);
  const displayed = discountItems.slice(4, 8);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <section className={styles.saleSection}>
      <TitleList title="Sale" type="All sales" link="/sales" />

      <div className={styles.saleGrid}>
        {displayed.map(prod => (
          <ProductCardMain
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            discont_price={prod.discont_price}
            image={prod.image}
            onClick={() => handleCardClick(prod.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default SaleSection;

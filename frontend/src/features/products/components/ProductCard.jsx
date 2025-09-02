import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';

import { formatPrice } from '@common/utils';
import api from '@api/axios.js';
import styles from './ProductCard.module.css';

import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartIconGreen from '@/assets/icons/heart_green.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from '../../discounts/components/DiscountPrice'


const ProductCard = ({ product }) => {
  const imageUrl = `${api.defaults.baseURL}/${product.image}`;

  // Определяем, является ли продукт избранным
  const dispatch = useDispatch();
  const isFavorite = useSelector(s => selectIsFavorite(s, product.id));

  const onToggleFavorite = (e) => {
    // кнопка находится внутри <Link> — предотвращаем переход
    e.preventDefault();
    e.stopPropagation();
    dispatch(addFavorite(product.id));
  };

  return (

    <div className={styles.productCard}>

      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <img src={imageUrl} alt={product.title} className={styles.productImg} />
        <h3 className={styles.productName}>{product.title}</h3>
        
        {/* Кнопка добавления в избранное */}
        <button
          type="button"
          className={styles['favorite-btn']}
          onClick={onToggleFavorite}
        >
          {isFavorite

            ? <HeartIconGreen className={styles.icon} />
            : <HeartIcon className={styles.icon} />
          }
        </button>
        <button className={styles['add-to-cart']}><CartIcon className={styles.icon} /></button>
      </Link>

      <div className={styles.priceBlock}>
        {product.discont_price ? (
          <>
            <DiscountBadge price={product.price} discont_price={product.discont_price} />
            <span className={styles.newPrice}>{formatPrice(product.discont_price)}</span>
            <span className={styles.oldPrice}>{formatPrice(product.price)}</span>
          </>
        ) : (
          <span className={styles.newPrice}>{formatPrice(product.price)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

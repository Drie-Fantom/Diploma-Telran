import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@redux/slices/cartSlice.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';

import { formatPrice } from '@common/utils';
import api from '@api/axios.js';
import styles from './ProductCard.module.css';

import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartIconGreen from '@/assets/icons/heart_green.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from '../../discounts/components/DiscountPrice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const imageUrl = `${api.defaults.baseURL}/${product.image}`;

  const handleAddToCart = (e) => {
    e.preventDefault();      // не переходим по <Link>
    e.stopPropagation();     // не пробрасываемся выше
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      discont_price: product.discont_price,
      image: product.image,
      quantity: 1,
    }));
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: здесь твоя логика добавления в избранное
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <img src={imageUrl} alt={product.title} className={styles.productImg} />
        <h3 className={styles.productName}>{product.title}</h3>

        <button
          type="button"
          className={styles.favoriteBtn} 
          onClick={handleFavorite}
        >
          <HeartIcon className={styles.icon} />
        </button>

        <button
          type="button"
          className={styles.addToCartBtn} 
          onClick={handleAddToCart}
        >
          <CartIcon className={styles.icon} />
        </button>
      </Link>

      <div className={styles.priceBlock}>
        {product.discont_price ? (
          <>
            <DiscountBadge
              price={product.price}
              discont_price={product.discont_price}
            />
            <span className={styles.newPrice}>
              {formatPrice(product.discont_price)}
            </span>
            <span className={styles.oldPrice}>
              {formatPrice(product.price)}
            </span>
          </>
        ) : (
          <span className={styles.newPrice}>
            {formatPrice(product.price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
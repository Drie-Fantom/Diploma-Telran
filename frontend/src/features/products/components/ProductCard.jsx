import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Добавлен для перехода на детали
import { addToCart } from '@redux/slices/cartSlice.js';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';
import { selectIsInCart } from '@redux/slices/cartSlice.js'; // Добавлен импорт селектора
import { Link } from 'react-router-dom';
import { formatPrice } from '@common/utils';
import api from '@api/axios.js';
import styles from './ProductCard.module.css';
import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartIconGreen from '@/assets/icons/heart_green.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import CartIconGreen from '@/assets/icons/cart_green.svg?react';
import DiscountBadge from '../../discounts/components/DiscountPrice';



const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для навигации
  const imageUrl = `${api.defaults.baseURL}/${product.image}`;

  const isFavorite = useSelector(s => selectIsFavorite(s, product.id));
  const isInCart = useSelector(s => selectIsInCart(s, product.id)); // Теперь работает

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    dispatch(addFavorite(product.id));
  };

  const handleClick = () => navigate(`/product/${product.id}`); // Переход на детали, если нужно; иначе удали onClick на img/p

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <img src={imageUrl} alt={product.title} className={styles.productImg} onClick={handleClick} />
        <h3 className={styles.productName} onClick={handleClick}>{product.title}</h3>

        <button
          type="button"
          className={`${styles.favoriteBtn} ${isFavorite ? styles.isActive : ''}`}
          onClick={handleFavorite}
        >
          {isFavorite ? (
    <HeartIconGreen className={styles.icon} />
  ) : (
    <>
      <HeartIcon className={`${styles.icon} ${styles.base}`} />
      <HeartIconGreen className={`${styles.icon} ${styles.hover}`} />
    </>
  )}
        </button>

        <button
  type="button"
  className={`${styles.addToCartBtn} ${isInCart ? styles.isActive : ''}`} // (isActive)
  onClick={handleAddToCart}
>
  {isInCart ? (
    <CartIconGreen className={styles.icon} />
  ) : (
    <>
      <CartIcon className={`${styles.icon} ${styles.base}`} />
      <CartIconGreen className={`${styles.icon} ${styles.hover}`} /> {}
    </>
  )}
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
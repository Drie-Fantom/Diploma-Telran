
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';
import { fetchProductById } from '@redux/slices/productSlice.js';
import { addToCart } from '@redux/slices/cartSlice.js';
import { Loader } from '@common/components';
import { formatPrice } from '@common/utils';
import api from '@api/axios.js';
import DiscountBadge from '../../discounts/components/DiscountPrice';
import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartIconGreen from '@/assets/icons/heart_green.svg?react';
import styles from './ProductDetailsPage.module.css';
import ImageZoomModal from '@common/components/feedback/ImageZoomModal';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status } = useSelector(state => state.products);

  // Определяем, является ли продукт избранным
  const isFavorite = useSelector(s => selectIsFavorite(s, id));
  const onToggleFavorite = () => dispatch(addFavorite(id));

  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);


  if (status === 'loading' || !current) return <Loader />;

  const imageUrl = `${api.defaults.baseURL}/${current.image}`;

  // Функция для добавления продукта в корзину: диспатчит экшен addToCart с копией текущего продукта и выбранным количеством
  const handleAddToCart = () => {
    dispatch(addToCart({ ...current, quantity }));
  };

  // Функция для увеличения количества: обновляет состояние quantity, увеличивая предыдущее значение на 1
  const handleIncrement = () => setQuantity(prev => prev + 1);

  // Функция для уменьшения количества: обновляет состояние quantity, уменьшая предыдущее значение на 1, но не ниже 1
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const description = current.description || '';
  const truncatedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

  return (
    <div className={styles.productDetails}>
      <img className={styles.productImg} src={imageUrl} alt={current.title} onClick={handleImageClick}
      />
      <div className={styles.content}>
        <div className={styles.upperContent}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>{current.title}</h2>
            <button
  type="button"
  className={`${styles.favoriteBtn} ${isFavorite ? styles.isActive : ''}`}
  onClick={onToggleFavorite}
>
  {isFavorite ? (
    <HeartIconGreen className={styles.icon} />
  ) : (
    <>
      <HeartIcon className={`${styles.icon} ${styles.base}`} />
      <HeartIconGreen className={`${styles.icon} ${styles.hover}`} /> {}
    </>
  )}
</button>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.priceContainer}>
              {current.discont_price ? (
                <>
                  <span className={styles.discountedPrice}>{formatPrice(current.discont_price)}</span>
                  <span className={styles.oldPrice}>{formatPrice(current.price)}</span>
                  <DiscountBadge
                    price={current.price}
                    discont_price={current.discont_price}
                    className={styles.customDiscountBadge}
                  />
                </>
              ) : (
                <span className={styles.discountedPrice}>{formatPrice(current.price)}</span>
              )}
            </div>
            <div className={styles.quantityContainer}>
              <div className={styles.blos}>
                <button onClick={handleDecrement} className={styles.quantityButton}>-</button>
                <input type="number" value={quantity} readOnly className={styles.quantityInput} />
                <button onClick={handleIncrement} className={styles.quantityButton}>+</button>
              </div>


              <button onClick={handleAddToCart} className={styles.addToCart}>Add to cart</button>
            </div>
          </div>
        </div>
        <div className={styles.descriptionBlock}>
          <h3 className={styles.descriptionTitle}>Description</h3>
          <p className={styles.descriptionText}>
            {showFullDescription ? description : truncatedDescription}
          </p>
          {!showFullDescription && description.length > 200 && (
            <button
              onClick={() => setShowFullDescription(true)}
              className={styles.readMore}
            >
              Read more
            </button>
          )}
        </div>
        {isModalOpen && (
          <ImageZoomModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            imageSrc={imageUrl}
            alt={current.title}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
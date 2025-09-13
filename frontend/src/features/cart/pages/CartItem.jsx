import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const imgSrc = item.image?.startsWith('/') ? `${baseUrl}${item.image}` : `${baseUrl}/${item.image}`;

  const currentPrice = item.discont_price || item.price;
  const itemTotal = currentPrice * item.quantity;

  return (
    <div className={styles.item}>
      <img src={imgSrc} alt={item.title} className={styles.itemImg} />
      <div className={styles.itemInfo}>
        <div className={styles.header}>
          <h2 className={styles.title}>{item.title}</h2>
          <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>X</button>
        </div>
        <div className={styles.controls}>
          <div className={styles.quantity}>
            <button onClick={() => onQuantityChange(item.id, -1)} className={styles.quantityButton}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, 1)} className={styles.quantityButton}>+</button>
          </div>
          <div className={styles.price}>
            <span className={styles.newPrice}>${itemTotal.toFixed(2)}</span>
            {item.discont_price && (
              <span className={styles.oldPrice}>${(item.price * item.quantity).toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
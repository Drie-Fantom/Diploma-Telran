import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/redux/slices/cartSlice.js';
import { useNavigate } from 'react-router-dom'; // Добавлен для back button
import CartList from './CartList.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import styles from './CartPage.module.css';
import Title from '@/common/components/ui/title.jsx';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для навигации назад
  const { items } = useSelector(state => state.cart);

  const totalPrice = items.reduce((sum, item) => sum + (item.discont_price || item.price) * (item.quantity || 1), 0);

  const handleQuantityChange = (id, delta) => {
    const item = items.find(i => i.id === id);
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleBack = () => {
    navigate('/'); 
  };

  if (items.length === 0) return <p className={styles.empty}>Shopping cart empty</p>;

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <Title text="Shopping cart" />
        <div className={styles.saleLine} />
        <button className={styles.backBtn} onClick={handleBack}>Back to the store</button>
      </div >
      <CartList items={items} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
      <CheckoutForm items={items} totalPrice={totalPrice} />
    </div>
  );
};

export default CartPage;
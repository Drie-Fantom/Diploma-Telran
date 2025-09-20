import React, { useState } from 'react'; // Добавлен useState для модалки
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/redux/slices/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import styles from './CartPage.module.css';
import TitleList from '@common/components/ui/title/TitleList.jsx';
import SvgX from '@/assets/icons/ic_x_dark.svg?react'; // Импорт для кнопки close в модалке
import { clearCart } from '@redux/slices/cartSlice.js';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false); // State для поп-апа в CartPage

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

  const handleOrderSuccess = () => {
    setIsModalOpen(true);
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearCart());
  };

  if (items.length === 0 & !isModalOpen) {
    return (
      <div className={styles.cartEmpty}>
        <TitleList title="Shopping cart" type="Back to the store" link="/" />
        <p className={styles.empty}>Looks like you have no items in your basket currently.</p>
        <button className={styles.continueBtn} onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <TitleList title="Shopping cart" type="Back to the store" link="/" />
      </div>

      <div className={styles.itemList}>
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <CheckoutForm items={items} totalPrice={totalPrice} onSuccess={handleOrderSuccess} />
      {isModalOpen && (
        <div className={styles.backdrop} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Congratulations!</h2>
              <button onClick={handleCloseModal} className={styles.modalClose}>
                <SvgX />
              </button>
            </div>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
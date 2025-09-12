import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileDrawer.module.css';
import ProductOfDayButton from "@features/home/components/ProductOfDay/ProductOfDayButton.jsx";

export default function MobileDrawer({ open, onClose, links, showDiscount }) {
  // Блокировка скролла фона, когда меню открыто
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // Закрытие по ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Клик по фону закрывает меню */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Панель — отдельный сосед поверх фона; клики по ней НЕ попадают на фон */}
      <aside className={styles.drawer}>
        <button
          type="button"
          className={styles.drawerClose}
          onClick={onClose}
        />
        <nav className={styles.drawerNav}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose}>
              {l.label}
            </Link>
          ))}
           {/* {showDiscount && (
          <button type="button" className={styles.discountMobile}>
            1 day discount!
          </button>
        )} */}
        {showDiscount && (
          <ProductOfDayButton
            className={styles.discountMobile}
            onClickExtra={onClose}   // Close the drawer when clicking the discount button
          />
        )}
        </nav>
       
      </aside>
    </>
  );
}
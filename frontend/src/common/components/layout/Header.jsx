import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useDarkMode from '../../hooks/useDarkMode.js';
import styles from "./Header.module.css";
import logo from '../../../assets/icons/logo.svg';
import { useState } from 'react';
import { navLinks } from './headerBurger/navLinks.js';
import DesktopNav from './headerBurger/DesktopNav.jsx';
import BurgerButton from './headerBurger/BurgerButton.jsx';
import MobileDrawer from './headerBurger/MobileDrawer.jsx';
import ProductOfDayButton from '@features/home/components/ProductOfDay/ProductOfDayButton.jsx';



export default function Header({ hideSeparator = false }) { // prop to optionally hide the line-border on HomePage
  const [theme, toggleTheme] = useDarkMode();
  const isDark = theme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the count of favorite items from Redux store
  const favCount = useSelector(s => s.favorites?.items?.length ?? 0);// Default to 0 if undefined
  // Determine the label to display on the favorites icon
  const favLabel = favCount > 99 ? '99+' : String(favCount);

  return (
    <header className={`${styles.header} ${hideSeparator ? styles.noSeparator : ''}`}>
      <div className={`${styles.container} ${styles['header-grid']}`}>
        <div className={styles['header-left']}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" height={70} />
          </div>

          <button
            type="button"
            className={styles.switch}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={isDark}
          >
            <span className={styles['switch__knob']} />
          </button>
        </div>

        {/* <div className={styles['header-center']}>
          <button className={styles['discount-btn']} type="button">1 day discount!</button>
          <DesktopNav links={navLinks} />
          <ProductOfDayButton className="btn-discount" />
          <ProductOfDayModal />
        </div> */}

        <div className={styles['header-center']}>
          <ProductOfDayButton className={styles['discount-btn']} />
          <DesktopNav links={navLinks} />
        </div>

        <div className={styles['header-right']}>
          <Link to="/favorites" className={`${styles['icon-btn']} ${styles['icon-heart']}`} >
            {favCount > 0 && <span className={styles.countBadge}>{favLabel}</span>}
          </Link>
          <Link to="/cart" className={`${styles['icon-btn']} ${styles['icon-cart']}`} />
          <BurgerButton open={menuOpen} onToggle={() => setMenuOpen(v => !v)} />
        </div>
      </div>

      {/* ВНЕ сетки: off-canvas для мобилок */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        showDiscount={true}
      />
    </header>
  );
}


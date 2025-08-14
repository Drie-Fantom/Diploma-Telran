import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode.js';
import styles from './Header.module.css';
import logo from '../../../assets/icons/logo.svg';

// const Header = () => {
//   const [theme, toggleTheme] = useDarkMode();
//   return (
//     <header>
//       <nav>
//         <Link to="/">Main Page</Link> |{' '}
//         <Link to="/categories">Categories</Link> |{' '}
//         <Link to="/products">All products</Link> |{' '}
//         <Link to="/sales">All sales</Link>
//       </nav>
//       <button onClick={toggleTheme}>{theme === 'dark' ? 'Light' : 'Dark'} Mode</button>
//     </header>
//   );
// };

export default function Header() {
  const [theme, toggleTheme] = useDarkMode();
  const isDark = theme === 'dark';

  return (
    <header className={styles.header}>
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

        <div className={styles['header-center']}>
          <button className={styles['discount-btn']} type="button">1 day discount!</button>

          <nav className={styles.nav}>
            <Link to="/">Main Page</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/products">All products</Link>
            <Link to="/sales">All sales</Link>
          </nav>
        </div>

        <div className={styles['header-right']}>
          <Link to="/favorites" className={`${styles['icon-btn']} ${styles['icon-heart']}`} aria-label="Favorites" />
          <Link to="/cart" className={`${styles['icon-btn']} ${styles['icon-cart']}`} aria-label="Cart" />
        </div>
      </div>
    </header>
  );
}

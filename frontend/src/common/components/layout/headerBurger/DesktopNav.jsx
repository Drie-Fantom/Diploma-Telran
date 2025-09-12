import { Link } from 'react-router-dom';
import styles from '../Header.module.css';
import ProductOfDayButton from "@features/home/components/ProductOfDay/ProductOfDayButton.jsx";

export default function DesktopNav({ links, showDiscount }) {
  return (
    <nav className={styles.nav}>
      {links.map((l) => (
        <Link key={l.to} to={l.to}>{l.label}</Link>
      ))}
      {showDiscount && (
        <ProductOfDayButton className={styles.discountDesktop} />
      )}
    </nav>
  );
}
import CartItem from "./CartItem";
import styles from './CartList.module.css'

const CartList = ({ items, onQuantityChange, onRemove}) => {
    return (
        <div className={styles.itemList}>
            {items.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={onQuantityChange}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}

export default CartList
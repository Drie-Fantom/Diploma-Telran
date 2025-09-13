import { useForm } from 'react-hook-form';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ items }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data) => {
    reset();
  };

  return (
    <div className={styles.checkoutRoot}>
      <div className={styles.checkoutPanel}>
        <h2 className={styles.checkoutTitle}>Order details</h2>

        <div className={styles.checkoutSummary}>
          <h3>{items.length} items</h3>
          <div className={styles.checkoutTotals}>
            <h3>Total</h3>
            <h2>$
              {items.reduce((sum, item) => sum + (item.discont_price || item.price) * item.quantity, 0).toFixed(2)}
            </h2>
          </div>
        </div>

        <form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.checkoutFields}>
            <input
              type="text"
              placeholder="Name"
              {...register('name', {
                required: 'Please enter your name',
                minLength: { value: 3, message: 'Name is too short (min 3)' },
                maxLength: { value: 40, message: 'Name is too long (max 40)' },
                pattern: { value: /^[A-Za-zА-Яа-яЁё]+$/, message: 'Name can contain only letters' },
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
              type="tel"
              placeholder="Phone number"
              {...register('phone', {
                required: 'Please enter your phone number',
                minLength: { value: 8, message: 'Phone number is too short' },
                maxLength: { value: 15, message: 'Phone number is too long' },
                pattern: { value: /^[+\d\s()-]+$/, message: 'Only allowed characters: 0-9 + ( ) - space' },
              })}
            />
            {errors.phone && <span>{errors.phone.message}</span>}

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Please enter your email',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <button className={styles.checkoutSubmit} type="submit">Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;

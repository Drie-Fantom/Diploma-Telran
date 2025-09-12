import { useDispatch } from 'react-redux';
import { prepareProductOfDay } from '@redux/slices/productOfDaySlice.js';

export default function ProductOfDayButton({ className = '', onClickExtra }) {
  const dispatch = useDispatch();
  const open = () => {
    dispatch(prepareProductOfDay());
    onClickExtra && onClickExtra(); // for closing the burger menu
  };
  return (
    <button type="button" className={className} onClick={open}>
      1 day discount!
    </button>
  );
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '@redux/slices/productSlice.js';


// Open the modal and select a random product.
// If the products are not loaded, load them first.
export const prepareProductOfDay = createAsyncThunk(
  'productOfDay/prepare',
  async (_, { getState, dispatch }) => {
    let items = getState().products.items;
    if (!items || items.length === 0) {
      items = await dispatch(fetchProducts()).unwrap(); // '/products/all'
    }
    const pool = (items || []).filter(p => Number(p?.price) > 0);
    const pick = pool[Math.floor(Math.random() * pool.length)] || null;
    return { id: pick?.id ?? null };
  }
);

const slice = createSlice({
  name: 'productOfDay',
  initialState: { isOpen: false, productId: null, discountPct: 50, status: 'idle' },
  reducers: {
    close(state) { state.isOpen = false; }
  },
  extraReducers: b => {
    b.addCase(prepareProductOfDay.pending, (s) => { s.status = 'loading'; s.productId = null; s.isOpen = true; });
    b.addCase(prepareProductOfDay.fulfilled, (s, a) => { s.status = 'ready'; s.productId = a.payload.id; s.isOpen = true; });
    b.addCase(prepareProductOfDay.rejected, (s) => { s.status = 'error'; s.isOpen = false; });
  }
});

export const { close } = slice.actions;
export default slice.reducer;

// --- Selectors (price, image, title) ---
export const selectProductOfDayState = s => s.productOfDay;

export const selectProductOfDay = s => {
  const { productId, discountPct } = s.productOfDay;
  const product = s.products.items.find(p => String(p.id) === String(productId));
  if (!product) return null;
  const priceNum = Number(product.price) || 0;
  const discountedPrice = Math.round(priceNum * (1 - discountPct / 100) * 100) / 100;
  return {
    product,                // have fields: id, title, price, image, ...
    discountedPrice,        // price with 50% discount
    discountPct
  };
};

import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '@redux/slices/homeSlice.js';
import productReducer from '@redux/slices/productSlice.js';
import categoryReducer from '@redux/slices/categorySlice.js';
import cartReducer from '@redux/slices/cartSlice.js';
import favoritesReducer from '@redux/slices/favoritesSlice.js';

// safely read favorites from localStorage
function loadFavorites() {
  try {
    if (typeof window === 'undefined') return []; // SSR (Server-Side Rendering) guard
    const raw = localStorage.getItem('favorites'); 
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    
    // normalization and deduplication
    return Array.from(new Set(parsed.map((x) => String(x))));
  } catch {
    return [];
  }
}

// middleware for saving favorites to localStorage
const saveFavoritesMw = (storeApi) => (next) => (action) => {
  const result = next(action); // 1) pass the action to the reducer

  // react only to favorite slice actions
  if (action.type.startsWith('favorites/')) { // 2) react only to the necessary actions
    try {
      const ids = storeApi.getState().favorites.items; // 3) taking the NEW state
      localStorage.setItem('favorites', JSON.stringify(ids)); // 4) save to localStorage
    } catch {
      // silently ignore access/quota errors
    }
  }
  return result;
};

const store = configureStore({
  reducer: {
    home: homeReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    favorites: favoritesReducer
  },
  preloadedState: { // initial state for favorites
    favorites: {
      items: loadFavorites()
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveFavoritesMw), // middleware for saving favorites to localStorage
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const normalizedId = (id) => String(id); // ensure id is a string

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {

    addFavorite: (state, action) => {
      const id = normalizedId(action.payload); // get id from payload
      if (state.items.includes(id)) {
        state.items = state.items.filter((i) => i !== id); // toggle off if already present
      } else {
        state.items.push(id); // toggle on if not present
      }
    },
    setFavorites: (state, action) => {
      const arr = Array.isArray(action.payload) ? action.payload : []; // ensure payload is an array
      state.items = Array.from(new Set(arr.map(normalizedId))); // set unique ids, remove duplicates
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    removeFavorite: (state, action) => {
      const id = normalizedId(action.payload); // get id from payload
      state.items = state.items.filter((i) => i !== id); // remove specific id
    }
  }
});

export const { addFavorite, setFavorites, clearFavorites, removeFavorite } = favoritesSlice.actions;

//selectors
export const selectFavoriteIds = (state) => state.favorites.items; // returns an array of favorite ids
export const selectIsFavorite = (state, id) => state.favorites.items.includes(String(id)); // check "is the product with this id in favorites?"- returns boolean

export default favoritesSlice.reducer;

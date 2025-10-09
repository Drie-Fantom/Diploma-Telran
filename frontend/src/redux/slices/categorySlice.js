import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@api/axios.js';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const { data } = await api.get('/categories/all');
  console.log('API response:', data); 
  return data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { items: [], status: 'idle', error: null }, 
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload?.items ?? [];
        state.count = action.payload?.count ?? state.items.length;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
// src/redux/slices/categorySlice.js
export const selectCategoriesState = s => s.categories;
export const selectCategoryItems  = s => Array.isArray(s.categories.items) ? s.categories.items : [];
export const selectCategoryCount  = s => s.categories.count ?? 0;

export default categorySlice.reducer;
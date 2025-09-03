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
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;
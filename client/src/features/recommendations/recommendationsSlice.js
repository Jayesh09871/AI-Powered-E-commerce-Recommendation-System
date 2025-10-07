import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// Async thunk for fetching personalized recommendations
export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await apiSlice.endpoints.getRecommendations.initiate(undefined, {
      forceRefetch: true
    });
    
    if (response.error) {
      throw new Error('Failed to fetch recommendations');
    }
    
    return response.data;
  }
);

const initialState = {
  recommendedProducts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastFetched: null,
};

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    clearRecommendations: (state) => {
      state.recommendedProducts = [];
      state.status = 'idle';
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendedProducts = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearRecommendations } = recommendationsSlice.actions;

export const selectAllRecommendations = (state) =>
  state.recommendations.recommendedProducts;

export const selectRecommendationsStatus = (state) =>
  state.recommendations.status;

export const selectRecommendationsError = (state) =>
  state.recommendations.error;

export default recommendationsSlice.reducer;

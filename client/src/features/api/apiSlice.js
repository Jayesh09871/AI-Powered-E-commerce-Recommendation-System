import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Update with your backend URL
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recommendations'],
  endpoints: (builder) => ({
    getRecommendations: builder.query({
      query: () => 'recommendations',
      providesTags: ['Recommendations'],
    }),
    trackProductView: builder.mutation({
      query: (productId) => ({
        url: 'track/view',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Recommendations'],
    }),
    trackPurchase: builder.mutation({
      query: (productId) => ({
        url: 'track/purchase',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Recommendations'],
    }),
  }),
});

export const {
  useGetRecommendationsQuery,
  useTrackProductViewMutation,
  useTrackPurchaseMutation,
} = apiSlice;

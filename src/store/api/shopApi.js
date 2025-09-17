import { apiSlice } from './apiSlice';

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => '/shops',
      providesTags: ['Shop'],
    }),
    getShop: builder.query({
      query: (id) => `/shops/${id}`,
      providesTags: (result, error, id) => [{ type: 'Shop', id }],
    }),
    createShop: builder.mutation({
      query: (shopData) => ({
        url: '/shops/create/',
        method: 'POST',
        body: shopData,
      }),
      invalidatesTags: ['Shop'],
    }),
    updateShop: builder.mutation({
      query: ({ id, ...shopData }) => ({
        url: `/shops/${id}`,
        method: 'PUT',
        body: shopData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Shop', id }, 'Shop'],
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shop'],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopApi;

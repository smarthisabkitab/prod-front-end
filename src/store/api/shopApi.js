import { apiSlice } from "./apiSlice";

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query({
      query: ({ page, limit, user_id, sort, order }) =>
        `/shops?page=${page}&limit=${limit}&user_id=${user_id}&sort=${sort}&order=${order}`,
      providesTags: ["Shop"],
    }),
    getShop: builder.query({
      query: (id) => `/shops/${id}`,
      providesTags: (result, error, id) => [{ type: "Shop", id }],
    }),
    createShop: builder.mutation({
      query: (shopData) => ({
        url: "/shops/create/",
        method: "POST",
        body: shopData,
      }),
      invalidatesTags: ["Shop"],
    }),
    updateShop: builder.mutation({
      query: ({ id, ...shopData }) => ({
        url: `/shops/edit/${id}`,
        method: "PATCH",
        body: shopData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Shop", id },
        "Shop",
      ],
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shops/delete/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Shop"],
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

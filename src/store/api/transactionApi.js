import { apiSlice } from "./apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShopTransactions: builder.query({
      query: (shopId) => `/shop-transaction/${shopId}/transactions`,
      providesTags: (result, error, shopId) => [
        { type: "Transaction", shopId },
      ],
    }),

    uploadShopTransaction: builder.mutation({
      query: ({ shopId, formData }) => ({
        url: `/shop-transaction/upload/${shopId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteShopTransaction: builder.mutation({
      query: ({ shopId, transactionId }) => ({
        url: `/shop-transaction/delete?shop_id=${shopId}&transaction_id=${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetShopTransactionsQuery,
  useUploadShopTransactionMutation,
  useDeleteShopTransactionMutation,
} = transactionApi;

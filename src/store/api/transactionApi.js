import { apiSlice } from "./apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShopTransactions: builder.query({
      query: (shopId) => `/shop-transaction/${shopId}/transactions`,
      providesTags: (result, error, shopId) => [
        { type: "Transaction", shopId },
      ],
    }),
  }),
});

export const { useGetShopTransactionsQuery } = transactionApi;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slices/authSlice";
import shopReducer from "./slices/shopSlice";
import userReducer from "./slices/userSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    shop: shopReducer,
    user: userReducer,
    shopTransaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

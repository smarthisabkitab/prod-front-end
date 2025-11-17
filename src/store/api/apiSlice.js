import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000/api/v1",
  // baseUrl: "https://api.smarthisabkitab.com/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If token expired (401)
  if (result?.error?.status === 401) {
    console.warn("Access token expired — trying refresh...");

    // Try refresh token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log("Token refreshed!");

      // Save new token + user
      api.dispatch(setCredentials(refreshResult.data));

      // Retry original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Refresh token failed — logging out");

      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Posts", "Subscription"],
  endpoints: () => ({}),
});

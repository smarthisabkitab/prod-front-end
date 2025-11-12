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

  if (result.error && result.error.status === 401) {
    // Token expired, try to refresh
    console.log("Token expired, attempting refresh...");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.success) {
      // Store the new token
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.accessToken,
          user: refreshResult.data.user,
        })
      );

      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - logout user
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Posts", "Subscription"],
  endpoints: () => ({}),
});

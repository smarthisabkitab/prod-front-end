import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `/auth/delete-profile`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      credentials: "include",
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: `/users/edit-profile`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
      credentials: "include",
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateProfileMutation,
} = userApi;

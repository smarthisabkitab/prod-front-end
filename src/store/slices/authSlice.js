import { createSlice } from "@reduxjs/toolkit";

const getStoredToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch {
    return null;
  }
};

const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: getStoredToken(),
    user: getStoredUser(),
    isAuthenticated: !!getStoredToken(),
    isLoading: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;

      state.accessToken = accessToken;
      state.user = user;
      state.isAuthenticated = true;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;

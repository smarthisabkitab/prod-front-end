import { createSlice } from "@reduxjs/toolkit";

// Helper to get token from localStorage
const getStoredToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: getStoredToken(),
    user: getStoredUser(),
    isAuthenticated: !getStoredToken(),
    isLoading: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.user = user;
      state.isAuthenticated = true;

      // Store token in localStorage
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions
export const { setCredentials, logout, setLoading } = authSlice.actions;

// Export selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;

// Export reducer
export default authSlice.reducer;

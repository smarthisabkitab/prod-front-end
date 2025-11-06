import { createSlice } from "@reduxjs/toolkit";

const getStoredToken = () => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: getStoredToken(),
    user: null,
    isAuthenticated: false,
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

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

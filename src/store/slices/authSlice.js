// store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Safe localStorage functions
const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const safeGetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

const getInitialState = () => {
  const token = safeGetItem("token");
  const user = safeGetItem("user");

  return {
    user: user ? JSON.parse(user) : null,
    token: token,
    isAuthenticated: !!token,
    isLoading: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;

      safeSetItem("token", token);
      safeSetItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      safeRemoveItem("token");
      safeRemoveItem("user");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      safeSetItem("user", JSON.stringify(state.user));
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const { setCredentials, logout, updateUser, setLoading } =
  authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  filters: {
    role: 'all',
    status: 'all',
    shopId: 'all',
    search: '',
  },
  sortBy: 'name',
  sortOrder: 'asc',
  viewMode: 'table', // table or grid
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  clearSelectedUser,
  setFilters,
  clearFilters,
  setSortBy,
  setSortOrder,
  setViewMode,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectSelectedUser = (state) => state.user.selectedUser;
export const selectUserFilters = (state) => state.user.filters;
export const selectUserSortBy = (state) => state.user.sortBy;
export const selectUserSortOrder = (state) => state.user.sortOrder;
export const selectUserViewMode = (state) => state.user.viewMode;

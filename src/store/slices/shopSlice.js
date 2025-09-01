import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedShop: null,
  filters: {
    status: 'all',
    search: '',
  },
  sortBy: 'name',
  sortOrder: 'asc',
  viewMode: 'table', // table or grid
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setSelectedShop: (state, action) => {
      state.selectedShop = action.payload;
    },
    clearSelectedShop: (state) => {
      state.selectedShop = null;
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
  setSelectedShop,
  clearSelectedShop,
  setFilters,
  clearFilters,
  setSortBy,
  setSortOrder,
  setViewMode,
} = shopSlice.actions;

export default shopSlice.reducer;

// Selectors
export const selectSelectedShop = (state) => state.shop.selectedShop;
export const selectShopFilters = (state) => state.shop.filters;
export const selectShopSortBy = (state) => state.shop.sortBy;
export const selectShopSortOrder = (state) => state.shop.sortOrder;
export const selectShopViewMode = (state) => state.shop.viewMode;

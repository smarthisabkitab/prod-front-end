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

const shopTransactionSlice = createSlice({
  name: 'shopTransaction',
  initialState,
  reducers: {
    setSelectedShopTransaction: (state, action) => {
      state.selectedShop = action.payload;
    },
    clearSelectedShopTransaction: (state) => {
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
  setSelectedShopTransaction,
  clearSelectedShopTransaction,
  setFilters,
  clearFilters,
  setSortBy,
  setSortOrder,
  setViewMode,
} = shopTransactionSlice.actions;

export default shopTransactionSlice.reducer;

// Selectors
export const selectSelectedShopTransaction = (state) => state.shopTransaction.selectedShop;
export const selectShopTransactionFilters = (state) => state.shopTransaction.filters;
export const selectShopTransactionSortBy = (state) => state.shopTransaction.sortBy;
export const selectShopTransactionSortOrder = (state) => state.shopTransaction.sortOrder;
export const selectShopTransactionViewMode = (state) => state.shopTransaction.viewMode;

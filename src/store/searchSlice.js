import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, STATUS } from "../utils";

const initialState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state, action) => {
      state.searchProducts = [];
      state.searchProductsStatus = STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchProducts.pending, (state) => {
        state.searchProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.searchProductsStatus = STATUS.SUCCEEDED;
        state.searchProducts = action.payload;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.searchProductsStatus = STATUS.FAILED;
      });
  },
});

export const fetchSearchProducts = createAsyncThunk(
  "product-search/fetch",
  async (serachTerm) => {
    const response = await fetch(`${BASE_URL}products/search?q=${serachTerm}`);
    const data = await response.json();
    return data.products;
  }
);

export const { clearSearch } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) =>
  state.search.searchProductsStatus;

export default searchSlice.reducer;

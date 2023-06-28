import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, STATUS } from "../utils";

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.categoriesStatus = STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = STATUS.SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = STATUS.FAILED;
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await fetch(`${BASE_URL}products/categories`);
    const data = await response.json();
    return data;
  }
);

export const getAllCategories = (state) => state.category.categories;
export default categorySlice.reducer;

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
      })
      .addCase(fetchProductOfCategory.pending, (state) => {
        state.categoryProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchProductOfCategory.fulfilled, (state, action) => {
        state.categoryProductsStatus = STATUS.SUCCEEDED;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductOfCategory.rejected, (state, action) => {
        state.categoryProductsStatus = STATUS.FAILED;
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

export const fetchProductOfCategory = createAsyncThunk(
  "category-products/fetch",
  async (category) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await response.json();
    return data.products;
  }
);

export const getAllCategories = (state) => state.category.categories;
export const getAllCategoryProducts = (state) =>
  state.category.categoryProducts;
export const getAllcategoryProductsStatus = (state) =>
  state.categoryProductsStatus;
export default categorySlice.reducer;

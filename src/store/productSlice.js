import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, STATUS } from "../utils";
const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = STATUS.SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAILED;
      })
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.productSingleStatus = STATUS.SUCCEEDED;
        state.productSingle = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllProductStatus = (state) => state.product.productsStatus;
export const getSingleProduct = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) =>
  state.product.productSingleStatus;

export default productSlice.reducer;

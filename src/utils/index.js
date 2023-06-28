export const BASE_URL = "https://dummyjson.com/";

export const STATUS = Object.freeze({
  IDLE: "IDLE",
  FAILED: "FAILED",
  LOADING: "LOADING",
  SUCCEEDED: "SUCCEEDED",
});

export const formatPrice = (price) => {
  return "$" + price.toFixed(2);
};

import productsTypes from "./products.types";
import productTypes from "./products.types";

export const addProductStart = (productData) => ({
  type: productTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
});

export const updateProductStart = (updateProductData) => ({
  type: productsTypes.UPDATE_PRODUCT_START,
  payload: updateProductData,
});

export const fetchProductStart = (productID) => ({
  type: productTypes.FETCH_PRODUCT_START,
  payload: productID,
});

export const setProduct = (product) => ({
  type: productTypes.SET_PRODUCT,
  payload: product,
});

export const fetchAllProductsStart = () => ({
  type: productsTypes.FETCH_ALL_PRODUCTS,
});

export const setAllProducts = (allProducts) => ({
  type: productTypes.SET_ALL_PRODUCTS,
  payload: allProducts,
});

export const resetLoading = () => ({
  type: productTypes.RESET_LOADING,
});

export const doneAction = () => ({
  type: productTypes.DONE_ACTION,
});

export const doneDelete = () => ({
  type: productTypes.DONE_DELETE,
});

export const fetchPromotionCodeStart = () => ({
  type: productTypes.FETCH_PROMOTION_CODE,
});

export const fetchAllPromotionCodeStart = () => ({
  type: productTypes.FETCH_ALL_PROMOTION_CODE,
});

export const setPromotionCode = (promotionCode) => ({
  type: productsTypes.SET_PROMOTION_CODE,
  payload: promotionCode,
});

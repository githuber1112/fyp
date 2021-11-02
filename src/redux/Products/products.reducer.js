import { actionChannel } from "@redux-saga/core/effects";
import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  product: {},
  allProducts: [],
  loading: false,
  status: "incomplete",
  promotionCode: [],
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case productsTypes.SET_PROMOTION_CODE:
      return {
        ...state,
        promotionCode: action.payload,
      };
    case productsTypes.FETCH_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case productsTypes.DONE_DELETE:
      return {
        ...state,
        loading: false,
        status: "deleted",
      };
    case productsTypes.DONE_ACTION:
      return {
        ...state,
        loading: false,
        status: "complete",
      };
    case productsTypes.UPDATE_PRODUCT_START:
      return {
        ...state,
        loading: true,
        status: "incomplete",
      };
    case productsTypes.RESET_LOADING:
      return {
        ...state,
        loading: false,
        status: "incomplete",
      };
    case productsTypes.ADD_NEW_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case productsTypes.SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;

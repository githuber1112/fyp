import { actionChannel } from "@redux-saga/core/effects";
import productsTypes from "./products.types";


const INITIAL_STATE = {
    products: [],
    product: {},
    allProducts: []
};

const productsReducer = ( state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case productsTypes.SET_PRODUCTS:
            return{
                ...state,
                products:action.payload
            }
        case productsTypes.SET_PRODUCT:
            return {
                ...state,
                product:action.payload
            }
        case productsTypes.SET_ALL_PRODUCTS:
            return{
                ...state,
                allProducts:action.payload
            }
        default:
            return state;
    }

}

export default productsReducer;
import productsTypes from './products.types';
import productTypes from './products.types';

export const addProductStart = productData => ({
    type: productTypes.ADD_NEW_PRODUCT_START,
    payload: productData
});

export const fetchProductsStart = (filters={}) => ({
    type:productsTypes.FETCH_PRODUCTS_START,
    payload:filters
    
});


export const setProducts = products => ({
    type:productsTypes.SET_PRODUCTS,
    payload: products
});

export const deleteProductStart = productID => ({
    type:productsTypes.DELETE_PRODUCT_START,
    payload:productID
});

export const fetchProductStart = productID => ({
    type:productTypes.FETCH_PRODUCT_START,
    payload:productID
});

export const setProduct = product => ({
    type:productTypes.SET_PRODUCT,
    payload:product
});
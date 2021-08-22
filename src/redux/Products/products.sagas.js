import {auth} from './../../firebase/utils'
import {takeLatest,all,put,call} from 'redux-saga/effects';
import { setProducts, setProduct, fetchProductsStart, fetchAllProductsStart, setAllProducts } from './products.actions';
import productsTypes from './products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProducts, handleFetchProduct, handleUpdateProducts, handleFetchAllProducts } from './products.helper';


export function* addProduct({payload}) {

    try{
        const timestamp = new Date();
        yield handleAddProduct({
           ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate:timestamp
        });
        yield put(
            fetchAllProductsStart()
        );
    }catch(err){

    }

}


export function* onAddProductStart () {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({payload}){
    try{
        const products = yield handleFetchProducts(payload);
        yield put (
            setProducts(products)
        );
    }catch(err){
        console.log(err)
    }
}

export function* onFetchProductsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct ({payload}) {
    try{
        yield handleDeleteProducts(payload);
        yield put (
            fetchAllProductsStart()
        );
    }catch(err){

    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({payload}){
    try {
        const product = yield handleFetchProduct(payload);
        yield put (
            setProduct(product)
        );
    }catch (err) {
        console.log(err);
    }
}

export function* onFetchProductStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}

export function* updateProduct({payload}){
    
    try{
        yield handleUpdateProducts(payload);
        yield put (
            fetchAllProductsStart()
        );
    }catch(err){
        console.log(err)
    }
}

export function* onUpdateProductStart(){
    yield takeLatest(productsTypes.UPDATE_PRODUCT_START, updateProduct)
}

export function* fetchAllProducts(){
    try{
        const allProducts = yield handleFetchAllProducts();
        yield put (
            setAllProducts(allProducts)
        );
    }catch(err){

    }
}

export function* onFetchAllProductsStart(){
    yield takeLatest(productsTypes.FETCH_ALL_PRODUCTS, fetchAllProducts)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart),
        call(onFetchProductStart),
        call(onUpdateProductStart),
        call(onFetchAllProductsStart),
        
    ])
}
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart } from '../../redux/Products/products.actions';
import Product from './Product';
import './styles.scss';

const mapState = ({ productsData}) => ({
    products: productsData.products
})

const ProductResult = ({}) => {
    const dispatch = useDispatch();
    const {products} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchProductStart()
        )
    },[]);

    if (!Array.isArray(products)) return null;

    if(products.length<1){
        return (
            <div className="products">
                <p>No search results</p>
            </div>
        );
    }

    return (
        <div className="products">
            <h1>Product page</h1>

            <div className="productResults">
            {products.map((product,pos) => {
                const{productThumbnail,productName,productPrice} = product;
                if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null;
                
                const configProduct = {
                    productThumbnail,
                    productName,
                    productPrice
                }

                return (
                    <Product {...configProduct} />
                );
            })}
            </div>
        </div>
    );
};

export default ProductResult;
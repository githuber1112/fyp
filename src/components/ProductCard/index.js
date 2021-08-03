import React, {useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../forms/Button';
import './styles.scss'
import productsTypes from '../../redux/Products/products.types';

const mapState = state => ({
    product: state.productsData.product
});


const ProductCard = ({ }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {productID} = useParams();
    const {product} = useSelector(mapState);

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc,
        documentID
    } = product;

    useEffect (() => {
        dispatch(
            fetchProductStart(productID)
        )

        return() => {
            dispatch(
                setProduct({})
            )
        }

    },[]);

    const handleAddToCart= (product) =>{
        if (!product) return;
        dispatch(
            addProduct(product)
        );
        history.push('/cart');
    }

    const configAddToCartBtn = {
        type: 'button'
    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            RM{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span className="productDesc"
                        dangerouslySetInnerHTML={{__html:productDesc}}/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductCard;
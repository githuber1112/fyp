import React, {useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../forms/Button';
import './styles.scss'
import productsTypes from '../../redux/Products/products.types';
import {ShoppingCartOutlined, HeartOutlined} from '@ant-design/icons';

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
                
                    <h1>
                        {productName}
                    </h1>

                    <h2>
                        RM{productPrice}
                    </h2>
                
                <div className="prodDetails">
                    <p>PRODUCT DETAILS</p>
                    <span className="productDesc"
                dangerouslySetInnerHTML={{__html:productDesc}}/>
                </div>      
                
                <div className="addToCart">
                        <Button className="addCartBtn" {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                            <ShoppingCartOutlined /> &nbsp;&nbsp; Add to Cart
                        </Button>

                        <Button className="addWishlistBtn">
                            {/*<HeartOutlined />*/}
                        </Button>
                </div>
                
            </div>
        </div>
    );
};

export default ProductCard;
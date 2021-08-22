import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import Button from '../../forms/Button';
import {useDispatch} from 'react-redux';
import {addProduct} from './../../../redux/Cart/cart.actions';
import { Card, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';


const Product = (product) => {
    const { Meta } = Card;
    const history = useHistory();
    const dispatch = useDispatch();
    const{
            documentID,
            productThumbnail,
            productName,
            productPrice,
            productDesc
        
    } = product;

   const productDesc1 = () =>  {
       return   <span dangerouslySetInnerHTML={{__html:productDesc}}/>
   };

    if(!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null;

    const configAddToCartBtn ={
        type:'button'
    };

    const handleAddToCart = (product) => {
        if (!product) return;
        dispatch(
            addProduct(product)
        );
        history.push('/cart');
    }   

    return (
        
  
        <div className="product">
            <Popover content={productDesc1} title={productName}>
            <Card hoverable={true} cover={<img src={productThumbnail} />} style={{width:300}} actions={[<ShoppingCartOutlined onClick={()=> handleAddToCart(product)}/>]}>
            <Link to={`/product/${documentID}`} >
              <Meta title={productName} description={productPrice}/>
            </Link>
            </Card>
            </Popover>
        </div>
    );
};

export default Product;
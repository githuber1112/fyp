import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";
import Button from "../forms/Button";
import "./styles.scss";
import productsTypes from "../../redux/Products/products.types";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Image } from "antd";
import BounceLoader from "react-spinners/BounceLoader";
import { Row, Col } from "antd";
import { handleAddToWishlist } from "../../redux/Wishlist/wishlist.helper";
import { addToWishlist } from "../../redux/Wishlist/wishlist.sagas";

const mapState = ({ productsData }) => ({
  product: productsData.product,
});

const ProductCard = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const {
    productName,
    productPrice,
    productDesc,
    documentID,
    allImageURL = [],
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    console.log(allImageURL);
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  const configAddToWishlistBtn = {
    type: "button",
  };

  const handleAddWishlist = () => {
    dispatch(addToWishlist(documentID));
  };

  return (
    <div className="productCard">
      <div className="imgThumb">
        <div className="hero">
          <Image src={allImageURL[0]} />
        </div>
        <div className="thumb">
          <Row>
            <Col span={6}>
              <Image src={allImageURL[1]} />
            </Col>
            <Col span={6}>
              <Image src={allImageURL[2]} />
            </Col>
            <Col span={6}>
              <Image src={allImageURL[3]} />
            </Col>
            <Col span={6}>
              <Image src={allImageURL[4]} />
            </Col>
          </Row>
        </div>
      </div>

      <div className="productDetails">
        <h1>{productName}</h1>

        <h2>RM{productPrice}</h2>

        <div className="prodDetails">
          <p>PRODUCT DETAILS</p>
          <span
            className="productDesc"
            dangerouslySetInnerHTML={{ __html: productDesc }}
          />
        </div>

        <div className="addToCart">
          <Button
            className="addCartBtn"
            {...configAddToCartBtn}
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCartOutlined /> &nbsp;&nbsp; Add to Cart
          </Button>

          <Button className="addWishlistBtn">
            <HeartOutlined
              style={{ color: "#ff5d7b" }}
              onClick={() => handleAddWishlist()}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

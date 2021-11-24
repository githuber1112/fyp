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
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Image } from "antd";
import BounceLoader from "react-spinners/BounceLoader";
import { Row, Col, message } from "antd";
import {
  addWishlist,
  checkWishlistStart,
  fetchWishlist,
  removeWishlist,
} from "../../redux/Wishlist/wishlist.actions";
import firebase from "firebase";
import "firebase/auth";

const mapState = ({ productsData }) => ({
  product: productsData.product,
});

const mapStateWishlist = ({ wishlistData }) => ({
  check: wishlistData.check,
});

const ProductCard = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const { check } = useSelector(mapStateWishlist);
  const [wishlistExist, setWishlistExist] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    productName,
    productPrice,
    productDesc,
    documentID,
    allImageURL = [],
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    if (firebase.auth().currentUser != null) {
      dispatch(checkWishlistStart(productID));
    }
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
    if (firebase.auth().currentUser != null) {
      dispatch(addWishlist(product));
    } else {
      message.warning("Please login first");
    }
  };

  return (
    <div className="productCard">
      <div className="imgThumb">
        <div className="hero">
          <Image src={allImageURL[0]} />
        </div>
        <div className="thumb">
          <Row>
            {allImageURL.map((item, i) => {
              console.log(allImageURL.length);
              if (i >= 1) {
                if (allImageURL.length == 4) {
                  return (
                    <Col span={8}>
                      <Image src={allImageURL[i]} />
                    </Col>
                  );
                }
                if (allImageURL.length == 3) {
                  return (
                    <Col span={12}>
                      <Image src={allImageURL[i]} />
                    </Col>
                  );
                }
                if (allImageURL.length == 2) {
                  return (
                    <Col span={24}>
                      <Image src={allImageURL[i]} />
                    </Col>
                  );
                }
                return (
                  <Col span={6}>
                    <Image src={allImageURL[i]} />
                  </Col>
                );
              }
            })}
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

          {check && (
            <Button
              className="addWishlistBtn"
              onClick={() => dispatch(removeWishlist(productID))}
            >
              <HeartFilled style={{ color: "#ff5d7b" }} />
            </Button>
          )}
          {!check && (
            <Button className="addWishlistBtn">
              <HeartOutlined
                style={{ color: "#ff5d7b" }}
                onClick={() => handleAddWishlist()}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

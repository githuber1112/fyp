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

const mapState = ({ productsData }) => ({
  product: productsData.product,
  loading: productsData.loading,
});

const ProductCard = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productID } = useParams();
  const [loading, setLoading] = useState(true);
  const { product, loading: loading1 } = useSelector(mapState);

  const { allImageURL, productName, productPrice, productDesc, documentID } =
    product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    console.log(allImageURL);
  }, []);

  useEffect(() => {
    setLoading(loading1);
  }, [loading1]);
  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return loading ? (
    <div className="loadingDiv">
      <BounceLoader color={"black"} loading={loading} size={100} />
    </div>
  ) : (
    <div className="productCard">
      <div className="hero">
        <Image src={allImageURL} />
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

          <Button className="addWishlistBtn">{/*<HeartOutlined />*/}</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

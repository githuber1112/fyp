import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../forms/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "./../../../redux/Cart/cart.actions";
import { Card, Popover } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Product = (product) => {
  const { Meta } = Card;
  const history = useHistory();
  const dispatch = useDispatch();
  const { documentID, allImageURL, productName, productPrice, productDesc } =
    product;

  const productDesc1 = () => {
    return <span dangerouslySetInnerHTML={{ __html: productDesc }} />;
  };

  if (!documentID || !productName || typeof productPrice === "undefined")
    return null;

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  let price = `RM${productPrice}`;

  return (
    <div className="product">
      <Card
        hoverable={true}
        cover={<img className="imgCardProduct" src={allImageURL[0]} />}
        style={{ width: 300 }}
        actions={[
          <ShoppingCartOutlined onClick={() => handleAddToCart(product)} />,
        ]}
      >
        <Link to={`/product/${documentID}`}>
          <Meta title={productName} description={price} />
        </Link>
      </Card>
    </div>
  );
};

export default Product;

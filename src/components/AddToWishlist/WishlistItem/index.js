import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { DeleteOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addProduct } from "./../../../redux/Cart/cart.actions";
import { Card, Popover } from "antd";

const WishlistItem = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { productName, allImageURL = [], productPrice, documentID } = product;

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <table className="wishlistItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img className="prodImg" src={allImageURL[0]} alt={productName} />
            <tr>
              {" "}
              <td className="productName">
                <div className="prodName">
                  <Link to={`/product/${documentID}`}>{productName}</Link>
                </div>
              </td>
            </tr>
          </td>

          <td align="center">RM{productPrice}</td>
          <td align="center">
            <span>
              <ShoppingCartOutlined onClick={() => handleAddToCart(product)} />
            </span>
          </td>

          <td align="center">
            <span className="wishlistBtn">
              <DeleteOutlined />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WishlistItem;

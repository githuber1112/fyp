import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../../redux/Cart/cart.actions";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const Item = (product) => {
  const dispatch = useDispatch();
  const {
    productName,
    allImageURL = [],
    productPrice,
    quantity,
    documentID,
  } = product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={allImageURL[0]} alt={productName} />
          </td>
          <td>{productName}</td>
          <td align="center">
            <div className="qtyBox">
              <span
                className="cartBtn"
                onClick={() => handleReduceItem(product)}
              >
                <MinusOutlined />
              </span>
              <span>&nbsp;&nbsp; {quantity} &nbsp;&nbsp;</span>
              <span
                className="cartBtn"
                onClick={() => handleAddProduct(product)}
              >
                <PlusOutlined />
              </span>
            </div>
          </td>
          <td align="center">RM{productPrice}</td>
          <td align="center">
            <span
              className="cartBtn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              <DeleteOutlined />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "../forms/Button";
import Item from "./Item";
import "./styles.scss";
import { fetchPromotionCodeStart } from "../../redux/Products/products.actions";
import FormInput from "./../forms/FormInput";
import { message } from "antd";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector(mapState);

  const errMsg = "You have no items in your cart.";

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <table
                  className="checkoutHeader"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr>
                      <th>PRODUCT</th>
                      <th></th>
                      <th align="center">QUANTITY</th>
                      <th align="center">PRICE</th>
                      <th align="center">REMOVE</th>
                    </tr>
                  </tbody>
                </table>
              </tr>

              <tr>
                <table border="0" cellPadding="0" cellPadding="0">
                  <tbody>
                    {cartItems.map((item, pos) => {
                      return (
                        <tr key={pos}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table
                  align="right"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tr align="right">
                    <td>
                      <h3>Total: RM{total}</h3>
                    </td>
                  </tr>
                  <tr>
                    <table border="0" cellPadding="10" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <Button
                              className="button1"
                              onClick={() => history.goBack()}
                            >
                              Continue Shopping
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="button2"
                              onClick={() => history.push("/payment")}
                            >
                              Checkout
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>{errMsg}</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "../forms/Button";
import WishlistItem from "./WishlistItem";
import { useHistory } from "react-router-dom";

const WishlistComponent = () => {
  const history = useHistory();

  const errMsg = "You have no items in your wishlist.";

  return (
    <div className="wishlistComp">
      <h1>Wishlist</h1>

      <div className="wishlist">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <table
                className="wishlistCompHeader"
                border="0"
                cellPadding="10"
                cellSpacing="0"
              >
                <tbody>
                  <tr>
                    <th>PRODUCT</th>
                    <th align="center">PRICE</th>
                    <th align="center">ADD TO CART</th>
                    <th align="center">REMOVE</th>
                  </tr>
                </tbody>
              </table>
            </tr>

            <tr>
              <table border="0" cellPadding="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </tr>

            <tr>
              <table align="right" border="0" cellPadding="10" cellSpacing="0">
                <tr>
                  <table border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <Button
                            className="button2"
                            onClick={() => history.goBack()}
                          >
                            Continue Shopping
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
      </div>
    </div>
  );
};

export default WishlistComponent;

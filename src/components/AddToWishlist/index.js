import React, { useEffect } from "react";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "../forms/Button";
import { useHistory, Link } from "react-router-dom";
import {
  fetchWishlist,
  removeWishlist,
} from "../../redux/Wishlist/wishlist.actions";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { addProduct } from "../../redux/Cart/cart.actions";
import { message } from "antd";

const mapStateWishlist = ({ wishlistData }) => ({
  wishlistItems: wishlistData.wishlistItems,
  status: wishlistData.status,
});

const WishlistComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { wishlistItems, status } = useSelector(mapStateWishlist);
  const errMsg = "You have no items in your wishlist.";

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  useEffect(() => {
    if (status == "complete") {
      message.success("Item removed from wishlist!");
    }
  }, [status]);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

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
                    <th align="center">PRICE(RM)</th>
                    <th align="center">ADD TO CART</th>
                    <th align="center">REMOVE</th>
                  </tr>
                </tbody>
              </table>
            </tr>

            <tr>
              <table border="0" cellPadding="0" cellPadding="0">
                <tbody>
                  {wishlistItems.map((item) => {
                    return (
                      <tr>
                        <th>
                          <Link to={`/product/${item.documentID}`}>
                            <img src={item.allImageURL[0]} />
                          </Link>
                        </th>
                        <th align="center">{item.productPrice}</th>
                        <th align="center">
                          <ShoppingCartOutlined
                            onClick={() => handleAddToCart(item)}
                          />
                        </th>
                        <th align="center">
                          <DeleteOutlined
                            onClick={() =>
                              dispatch(removeWishlist(item.documentID))
                            }
                          />
                        </th>
                      </tr>
                    );
                  })}
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

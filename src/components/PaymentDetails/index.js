import React, { useState, useEffect, useRef } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { apiInstance } from "../../utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "./../../redux/Cart/cart.selectors";
import {
  saveOrderHistory,
  saveRecentOrderHistory,
} from "./../../redux/Orders/orders.actions";
import { clearCart } from "./../../redux/Cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcAmex,
  faCcDiscover,
  faCcMastercard,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
import emailjs from "emailjs-com";
import { Checkbox, message, Row, Col, Divider, Table, Tooltip } from "antd";
import { fetchPromotionCodeStart } from "../../redux/Products/products.actions";
import { InfoCircleOutlined } from "@ant-design/icons";
import Form from "rc-field-form/es/Form";
import FormItem from "antd/lib/form/FormItem";
import Item from "../Checkout/Item";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

/* const loadingState ={
  loading: false
};

const loadingData = () => {
  this.setLoadingState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setLoadingState({ loading: false });
    }, 2000);
};

const {loading} = loadingState; */

const userMapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const orderMapState = ({ ordersData }) => ({
  loading: ordersData.loading,
  status: ordersData.status,
  orderHistory: ordersData.orderHistory,
});

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const promoCodeMapState = ({ productsData }) => ({
  promotionCode: productsData.promotionCode,
});

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const { promotionCode } = useSelector(promoCodeMapState);
  const [promotionCodeInput, setPromotionCodeInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(total);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(false);
  const [promoCodeNameChosen, setPromoCodeNameChosen] = useState("");
  const [promoCodeAmountChosen, setPromoCodeAmountChosen] = useState("");
  const { currentUser } = useSelector(userMapState);
  const { loading, status, orderHistory } = useSelector(orderMapState);
  const dispatch = useDispatch();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const { email, displayName } = currentUser;
  const [currentLoading, setCurrentLoading] = useState(false);

  var templateParams = {
    to: email,
    name: displayName,
    total: totalPrice,
  };

  useEffect(() => {
    setTotalPrice(total);
  }, [total]);

  useEffect(() => {
    setRecipientName(displayName);
  }, []);

  useEffect(() => {
    setCurrentLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (status == "complete") {
      message.success("Payment successfull, please check your email!", 5);
    }
  }, [status]);

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/dashboard");
    }
  }, [itemCount]);

  const handlePromoCode = () => {
    promotionCode.map((item) => {
      if (promotionCodeInput == item.codeName) {
        switch (item.discountType) {
          case "percentage":
            setTotalPrice((totalPrice * (100 - item.discountAmount)) / 100);
            setDisable(true);
            setPromoCodeNameChosen(item.codeName);
            setPromoCodeAmountChosen((totalPrice * item.discountAmount) / 100);
            message.success(
              `Successfully applied promo code : ${item.codeName}`
            );
            return;
            break;
          case "fixedAmount":
            if (totalPrice < item.discountAmount) {
              message.error("Please topup");
              setError(false);
              return;
            } else {
              setTotalPrice(totalPrice - item.discountAmount);
              setPromoCodeNameChosen(item.codeName);
              setPromoCodeAmountChosen(item.discountAmount);
              setDisable(true);
              message.success(
                `Successfully applied promo code : ${item.codeName}`
              );
              return;
            }
            break;
        }
        return;
      } else {
        setError(true);
      }
    });
  };

  useEffect(() => {
    setError(false);
  }, [disable]);

  useEffect(() => {
    dispatch(fetchPromotionCodeStart());
  }, []);

  // useEffect(() => {
  //   if (handleFormSubmit){
  //     message.success("Payment successfull!");
  //   }
  // }, []);

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    if (!checked) {
      setBillingAddress({
        ...shippingAddress,
      });

      // document.getElementById("text").disabled = true;
    } else {
      setBillingAddress({
        ...initialAddressState,
      });
    }
  };

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    setCurrentLoading(true);
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post("/payments/create", {
        amount: totalPrice * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            if (!paymentMethod) {
              console.log("error!!!");
              message.error("Invalid Card Details");
              setCurrentLoading(false);
              return;
            }
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })

              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: totalPrice,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      allImageURL,
                      productName,
                      productPrice,
                      quantity,
                    } = item;

                    return {
                      documentID,
                      allImageURL,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                console.log(configOrder);
                sendEmail();
                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  const sendEmail = () => {
    console.log(templateParams);

    emailjs
      .send(
        "service_jzr6y7f",
        "template_8azgz5h",
        templateParams,
        "user_9QUKndUMONiSkSFx2deMH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="paymentWrapper">
      <Row>
        <Col span={16}>
          <div className="paymentDetails">
            <form id="paymentForm" onSubmit={handleFormSubmit}>
              <div className="group">
                <h2>Shipping Address</h2>
                <label class="required">Recipient Name</label>
                <FormInput
                  required
                  // placeholder="Recipient Name"
                  name="recipientName"
                  handleChange={(evt) => setRecipientName(evt.target.value)}
                  value={recipientName}
                  type="text"
                />
                <label class="required">Shipping Address</label>
                <FormInput
                  required
                  placeholder="Line 1"
                  name="line1"
                  handleChange={(evt) => handleShipping(evt)}
                  value={shippingAddress.line1}
                  type="text"
                />
                <FormInput
                  placeholder="Line 2 (Optional)"
                  name="line2"
                  handleChange={(evt) => handleShipping(evt)}
                  value={shippingAddress.line2}
                  type="text"
                />
                <label class="required">City</label>
                <FormInput
                  required
                  //placeholder="City"
                  name="city"
                  handleChange={(evt) => handleShipping(evt)}
                  value={shippingAddress.city}
                  type="text"
                  pattern="^[a-zA-Z ]*$"
                />
                <label class="required">State</label>
                <FormInput
                  required
                  //placeholder="State"
                  name="state"
                  handleChange={(evt) => handleShipping(evt)}
                  value={shippingAddress.state}
                  type="text"
                  pattern="^[a-zA-Z ]*$"
                />
                <label class="required">Postal Code</label>
                <FormInput
                  required
                  //placeholder="Postal Code"
                  name="postal_code"
                  handleChange={(evt) => handleShipping(evt)}
                  value={shippingAddress.postal_code}
                  type="text"
                  pattern="^[0-9]*$"
                  maxLength={5}
                />
                <label class="required">Country</label>
                <div className="formRow checkoutInput">
                  <CountryDropdown
                    required
                    onChange={(val) =>
                      handleShipping({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                    value={shippingAddress.country}
                    valueType="short"
                  />
                </div>
                <label>
                  <input
                    type="checkbox"
                    name="checky"
                    checked={checked}
                    onChange={handleCheck}
                  />{" "}
                  Shipping address is same as billing address.
                </label>
              </div>
              <br></br>

              <div className="group">
                <h2>Billing Address</h2>

                <label class="required">Name on Card</label>
                <FormInput
                  required
                  //placeholder="Name on Card"
                  name="nameOnCard"
                  handleChange={(evt) => setNameOnCard(evt.target.value)}
                  value={nameOnCard}
                  type="text"
                />

                <label class="required">Billing Address</label>
                <FormInput
                  required
                  placeholder="Line 1"
                  name="line1"
                  handleChange={(evt) => handleBilling(evt)}
                  value={billingAddress.line1}
                  type="text"
                />

                <FormInput
                  placeholder="Line 2 (Optional)"
                  name="line2"
                  handleChange={(evt) => handleBilling(evt)}
                  value={billingAddress.line2}
                  type="text"
                />

                <label class="required">City</label>
                <FormInput
                  required
                  //placeholder="City"
                  name="city"
                  handleChange={(evt) => handleBilling(evt)}
                  value={billingAddress.city}
                  type="text"
                  pattern="^[a-zA-Z ]*$"
                />

                <label class="required">State</label>
                <FormInput
                  required
                  //placeholder="State"
                  name="state"
                  handleChange={(evt) => handleBilling(evt)}
                  value={billingAddress.state}
                  type="text"
                  pattern="^[a-zA-Z ]*$"
                />

                <label class="required">Postal Code</label>
                <FormInput
                  required
                  //placeholder="Postal Code"
                  name="postal_code"
                  handleChange={(evt) => handleBilling(evt)}
                  value={billingAddress.postal_code}
                  type="text"
                  pattern="^[0-9]*$"
                  maxLength={5}
                />

                <label class="required">Country</label>
                <div className="formRow checkoutInput">
                  <CountryDropdown
                    required
                    onChange={(val) =>
                      handleBilling({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                    value={billingAddress.country}
                    valueType="short"
                  />
                </div>
              </div>

              <div className="group">
                <h2>Card Details</h2>

                <p>Accepted Card</p>
                <div class="icon-container">
                  <span className="visa">
                    <FontAwesomeIcon icon={faCcVisa} />
                  </span>
                  <span className="amex">
                    <FontAwesomeIcon icon={faCcAmex} />
                  </span>
                  <span className="master">
                    <FontAwesomeIcon icon={faCcMastercard} />
                  </span>
                  <span className="discover">
                    <FontAwesomeIcon icon={faCcDiscover} />
                  </span>
                </div>

                <CardElement options={configCardElement} required />
              </div>
            </form>
          </div>
        </Col>
        <Col span={1}>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col span={7}>
          <div className="smallCart">
            <table border="0" cellPadding="0" cellPadding="0">
              <tbody>
                {cartItems.map((item, pos) => {
                  return (
                    <tr key={pos}>
                      <td>
                        <table
                          className="cartItem"
                          border="0"
                          cellSpacing="0"
                          cellPadding="10"
                        >
                          <tbody>
                            <tr>
                              <td>
                                <img
                                  className="smallCartImage"
                                  src={item.allImageURL[0]}
                                  alt={item.productName}
                                />
                              </td>
                              <td width="200px">{item.productName}</td>

                              <td align="center">RM{item.productPrice}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="promoCodeInput">
            <div className="promoCodeWrapper">
              <FormInput
                disabled={disable}
                type="text"
                value={promotionCodeInput}
                placeholder="Enter promo code"
                handleChange={(e) => setPromotionCodeInput(e.target.value)}
                style={{
                  width: 240,
                  borderRadius: 10,
                  float: "left",
                  marginRight: 10,
                  height: "50px",
                }}
              />

              {!disable && [
                <Button onClick={handlePromoCode} className="promoCodeBtn">
                  Apply
                </Button>,
              ]}
            </div>
            {error && [
              <div className="promoCodeError">Promo code not exist</div>,
            ]}
          </div>

          <div className="summaryDiv">
            <div className="subTotal">
              <Row>
                <Col span={20}>
                  <span>Subtotal</span>
                </Col>
                <Col span={4}>
                  <span>RM{total}</span>
                </Col>
              </Row>
            </div>
            <div className="subTotal">
              {disable && [
                <Row>
                  <Col span={20}>
                    <span>Promo code applied : `${promoCodeNameChosen}`</span>
                  </Col>
                  <Col span={4}>
                    <span>RM{promoCodeAmountChosen}</span>
                  </Col>
                </Row>,
              ]}
            </div>

            <Divider />
            <div className="totalPriceDiv">
              <Row>
                <Col span={20}>
                  <span>Total</span>
                </Col>
                <Col span={4}>
                  <span>RM{totalPrice}</span>
                </Col>
              </Row>
            </div>
          </div>

          <div className="paymentBtn">
            <Button
              form="paymentForm"
              className="payBtn"
              htmlType="submit"
              loading={currentLoading}
            >
              Pay Now
              {/* {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Payment Processing</span>}
          {!loading && <span>Pay Now</span>} */}
            </Button>
            <Button className="backBtn" onClick={() => history.goBack()}>
              Back to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentDetails;

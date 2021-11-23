import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "./../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import Logo from "./../../assets/logo.png";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Badge, Popover, Card, Divider, Empty } from "antd";
import AutoComplete1 from "./../AutoComplete/index";
import Button from "./../forms/Button/index";
import {
  selectCartItems,
  selectCartTotal,
} from "./../../redux/Cart/cart.selectors";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "./../../redux/Cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

const { Meta } = Card;

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const mapState1 = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const { cartItems, total } = useSelector(mapState1);
  const [isOpened, setIsOpened] = useState(false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showUl, setShowUl] = useState(true);
  const [selected, setSelected] = useState(0);

  const toggleSearch = () => {
    setIsOpened((wasOpened) => !wasOpened);
    setShowUl(!showUl);
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

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

  const content =
    cartItems.length < 1 ? (
      <div className="emptyDiv">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    ) : (
      <div className="popoverContainer">
        <div className="scrollWrapper">
          <ScrollMenu>
            {cartItems.map((item, pos) => {
              return (
                <div className="item">
                  <Card
                    hoverable
                    actions={[
                      <div className="actionDiv">
                        <span
                          className="spanQuantityLess"
                          onClick={() => handleReduceItem(item)}
                        >
                          <LeftOutlined />
                        </span>
                        <span>&nbsp;&nbsp;{item.quantity}&nbsp;&nbsp;</span>
                        <span
                          className="spanQuantityMore"
                          onClick={() => handleAddProduct(item)}
                        >
                          <RightOutlined />
                        </span>
                      </div>,
                      <span
                        onClick={() => handleRemoveCartItem(item.documentID)}
                      >
                        <DeleteOutlined />
                      </span>,
                    ]}
                    style={{ width: 300, height: 300 }}
                    cover={
                      <img
                        src={item.allImageURL[0]}
                        style={{ width: 300, height: 300 }}
                      />
                    }
                  >
                    <Meta title={item.productName} />
                  </Card>
                </div>
              );
            })}
          </ScrollMenu>
        </div>

        <Divider />
        <div className="actionContainer">
          <a
            className="cartTag"
            onClick={() => {
              history.push("/cart");
            }}
          >
            Your Cart
          </a>

          <a
            onClick={() => {
              history.push("/payment");
            }}
          >
            Checkout
          </a>
        </div>
      </div>
    );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {showUl ? (
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <span className="logoNav">
              elonMask
              <i class="fas fa-copyright"></i>
            </span>
          </Link>
        ) : null}
        {showUl ? (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/aboutus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/covidtracker"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Covid-19 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contactus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>

            {!currentUser && [
              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>,
            ]}
            {currentUser && [
              <li>
                <Link
                  to="/dashboard"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>,
            ]}
          </ul>
        ) : null}

        <div className="callToActions">
          <ul>
            <li>
              {isOpened && (
                <div className="boxContent" onBlur={toggleSearch}>
                  <AutoComplete1 />
                </div>
              )}
            </li>
            <li>
              <SearchOutlined
                style={{ fontSize: "150%" }}
                onClick={toggleSearch}
              />
            </li>
            <li>
              <Popover
                content={content}
                placement={"bottomRight"}
                style={{ borderRadius: "10px" }}
              >
                <Badge count={totalNumCartItems} showZero>
                  <Link to="/cart">
                    <ShoppingCartOutlined style={{ fontSize: "150%" }} />
                  </Link>
                </Badge>
              </Popover>
            </li>

            {currentUser && [
              <li>
                <Link to="/profile">
                  <UserOutlined style={{ fontSize: "150%" }} />
                </Link>
              </li>,
            ]}

            {!currentUser && [
              <li>
                <Link to="/login">
                  <UserOutlined style={{ fontSize: "150%" }} />
                </Link>
              </li>,
            ]}
            <li>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;

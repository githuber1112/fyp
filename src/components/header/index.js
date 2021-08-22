import React, {useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signOutUserStart} from './../../redux/User/user.actions';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import './styles.scss';
import Logo from './../../assets/logo.png';
import { ShoppingCartOutlined, UserOutlined,SearchOutlined,LeftOutlined,RightOutlined,DeleteOutlined } from '@ant-design/icons';
import { Badge,Popover,Card,Divider } from 'antd';
import AutoComplete1 from './../AutoComplete/index';
import Button from './../forms/Button/index'
import {selectCartItems, selectCartTotal} from './../../redux/Cart/cart.selectors';
import {removeCartItem,addProduct, reduceCartItem} from './../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import Flicking from "@egjs/react-flicking";




const {Meta} = Card;

const mapState = (state) => ({
    currentUser:  state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const mapState1 = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const Header = props => {
    const dispatch = useDispatch();
    const{currentUser, totalNumCartItems} = useSelector(mapState);
    const {cartItems,total} = useSelector(mapState1);
    const [isOpened, setIsOpened] = useState(false);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [showUl ,setShowUl] = useState(true)
    const [selected,setSelected] = useState(0);
    const flicking = useRef(null);
    


    const toggleSearch = () => {
        setIsOpened(wasOpened => !wasOpened)
        setShowUl(!showUl);
        
    }

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

      window.addEventListener('resize', showButton);

      const handleRemoveCartItem =(documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (product) =>{
        dispatch(
            addProduct(product)
        )
    }

    const handleReduceItem = (product) => {
        dispatch(
            reduceCartItem(product)
        )
    }



    const content =  (
      <div className="popoverContainer">
        <div className="flickingWrapper">
        <span onClick={() => flicking.current.prev()}><LeftOutlined style={{ fontSize: '300%'}}/></span>
        <Flicking 
        className="flicking"
        ref={flicking}
        onMoveEnd= { e => {
          setSelected(e.item);
        }}
        gap={10}
        style={{height:400}}
        >
          {cartItems.map((item,pos) => {
            return (
              <div className="panel">
              <Card 
              hoverable
              actions = {[<div className="actionDiv"><span className="spanQuantityLess" onClick={()=> handleReduceItem(item)}><LeftOutlined /></span><span>&nbsp;&nbsp;{item.quantity}&nbsp;&nbsp;</span><span className="spanQuantityMore" onClick={()=>handleAddProduct(item)}><RightOutlined /></span></div>,<span onClick={()=>handleRemoveCartItem(item.documentID)}><DeleteOutlined /></span>]}
              style={{width:300,height:300}}
              cover={<img src={item.productThumbnail} style={{width:300,height:300}}/>}
              >
                <Meta title={item.productName}/>
              </Card>
              </div>

            )
          })}
        </Flicking>
        <span onClick={() => flicking.current.next()}><RightOutlined style={{ fontSize: '300%'}}  /></span>
        </div>


        <Divider/>
        <div className="actionContainer">
          <h2>Total:RM{total}</h2>
          <a className="cartTag" href="/cart">Your Cart</a>
          <a href="/payment">Checkout</a>
        </div>
      </div>

    )

    
   
    return (
        
            <nav className='navbar'>
        <div className='navbar-container'>
          {showUl ?
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <span className="logoNav">elonMask
            <i class="fas fa-copyright"></i></span>
          </Link> : null}
        { showUl ?
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/search'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/aboutus'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contactus'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact Us  
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        : null }
         
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
                        <SearchOutlined style={{ fontSize: '150%'}} onClick={toggleSearch} />
                        </li>
                        <li>
                          <Popover  content={content} placement={'bottomRight'} style={{borderRadius: '10px'}} >
                            <Badge count={totalNumCartItems} showZero>
                            <Link to="/cart">
                            <ShoppingCartOutlined style={{ fontSize: '150%'}} />
                            </Link>
                            </Badge>
                            </Popover>
                        </li>




                    {currentUser && [
                 
                        <li>
                             <Link to="/dashboard">
                             <UserOutlined style={{ fontSize: '150%'}} />
                             </Link>
                        </li>
                    ]}

                    {!currentUser && [
                  
                       
                        <li>
                             <Link to="/login">
                             <UserOutlined style={{ fontSize: '150%'}} />
                             </Link>
                         </li>
                
                    ]}
              <li>
              <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
              </li>
            </ul>
          
          
          </div>
        </div>
      </nav>
            
    );
};

Header.defaultProps = {
    currentUser: null
};



export default Header;
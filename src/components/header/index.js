import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signOutUserStart} from './../../redux/User/user.actions';
import './styles.scss';
import Logo from './../../assets/logo.png';



const mapState = ({user}) => ({
    currentUser:  user.currentUser
});

const Header = props => {
    const dispatch = useDispatch();
    const{currentUser} = useSelector(mapState);
    
    const signOut = () => {
        dispatch(signOutUserStart());
    };
    
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to= "/">
                    <img src={Logo} alts="Logo"/>
                    </Link>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to ="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to ="/search">
                                Shop
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">

                   {currentUser && (
                      <ul>
                        <li>
                             <Link to="/dashboard">
                             My Account
                             </Link>
                        </li>  
                          <li>
                            <span  onClick={() => signOut()}>
                                Logout
                            </span>
                          </li>
                      </ul>
                   )}
                   
                    {!currentUser && (
                         <ul>
                         <li>
                             <Link to="/registration">
                             Register 
                             </Link>
                         </li>
                         <li>
                             <Link to="/login">
                             Login 
                             </Link>
                         </li>
                     </ul>
                    )}
                   
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};



export default Header;
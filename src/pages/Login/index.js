import React from 'react';
import './styles.scss';
import SignIn from './../../components/SignIn';
import Cross from './../../assets/cross.png';
import {Link} from 'react-router-dom';



const Login = props => {

    return (
    <div className="login">
    <div className="cross">
    <span >
      <Link to="/">
      <img className="imgRegistration" src={Cross} alts="close"/>
      </Link>
    </span>
    </div>
    <SignIn />
    </div>
    
    );
};

export default Login;
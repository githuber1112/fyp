import React from 'react';
import EmailPassword from './../../components/EmailPassword';
import Cross from './../../assets/cross.png';
import './styles.scss';
import {Link} from 'react-router-dom';

const ForgetPassword = props => {
    return (
        <div className="forgetPassword">
        <div className="cross">
        <Link to="/">
          <img src={Cross} alts="close"/>
         </Link>
        </div>
        <EmailPassword />
        </div>
        
        );

  
};

export default ForgetPassword;
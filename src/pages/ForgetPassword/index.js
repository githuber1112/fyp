import React from 'react';
import EmailPassword from './../../components/EmailPassword';
import Cross from './../../assets/cross.png';
import './styles.scss';
import {useHistory} from 'react-router-dom';

const ForgetPassword = props => {
    const history = useHistory();
    return (
        <div className="forgetPassword">
        <div className="cross">
        <span onClick={() => history.goBack()}>
       <img className="imgRegistration" src={Cross} alts="close"/>
       </span>
        </div>
        <EmailPassword />
        </div>
        
        );

  
};

export default ForgetPassword;
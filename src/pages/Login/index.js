import React from 'react';
import './styles.scss';
import SignIn from './../../components/SignIn';
import Cross from './../../assets/cross.png';
import {withRouter} from 'react-router-dom';



const Login = props => {

    return (
    <div className="login">
    <div className="cross">
    <span onClick={() => props.history.goBack()}>
      <img src={Cross} alts="close"/>
    </span>
    </div>
    <SignIn />
    </div>
    
    );
};

export default withRouter(Login);
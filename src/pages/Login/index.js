import React from 'react';
import './styles.scss';
import SignIn from './../../components/SignIn';
import Cross from './../../assets/cross.png';
import {useHistory} from 'react-router-dom';



const Login = props => {
    const history = useHistory();
    return (
    <div className="login">
    <div className="cross">
    <span onClick={() => history.goBack()}>
      <img className="imgRegistration" src={Cross} alts="close"/>
    </span>
    </div>
    <SignIn />
    </div>
    
    );
};

export default Login;
import React from 'react';
import './styles.scss';
import SignUp from './../../components/SignUp';
import Cross from './../../assets/cross.png';
import {Link} from 'react-router-dom';



const Registration = props => {

    return (
    <div className="registration">
    <div className="cross">
    <Link to="/">
      <img src={Cross} alts="close"/>
     </Link>
    </div>
    <SignUp />
    </div>
    
    );
};

export default Registration;
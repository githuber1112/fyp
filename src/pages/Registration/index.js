import React from 'react';
import './styles.scss';
import SignUp from './../../components/SignUp';
import Cross from './../../assets/cross.png';
import {withRouter} from 'react-router-dom';



const Registration = props => {

    return (
    <div className="registration">
    <div className="cross">
    <span onClick={() => props.history.goBack()}>
      <img src={Cross} alts="close"/>
     </span>
    </div>
    <SignUp />
    </div>
    
    );
};

export default withRouter(Registration);
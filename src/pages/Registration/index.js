import React from 'react';
import './styles.scss';
import SignUp from './../../components/SignUp';
import Cross from './../../assets/cross.png';
import {useHistory} from 'react-router-dom';



const Registration = props => {
    const history = useHistory();
    return (
    <div className="registration">
    <div className="cross">
    <span onClick={() => history.goBack()}>
      <img src={Cross} alts="close"/>
     </span>
    </div>
    <SignUp />
    </div>
    
    );
};

export default Registration;
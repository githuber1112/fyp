import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './styles.scss';
import {Link,useHistory} from 'react-router-dom';
import Button from './../forms/Button';
import {emailSignInStart, googleSignInStart} from './../../redux/User/user.actions';
import googleIcon from './../../assets/googleButton.png'
import googleHoverIcon from './../../assets/googleButtonHover.png'


import AuthWrapper from './../../components/AuthWrapper';
import FormInput from './../forms/FormInput';
import Buttons from './../forms/Button';

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr

})

const SignIn = props =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser,userErr} = useSelector(mapState);
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);


    useEffect(() => {
        if(currentUser){
            resetForm();
            history.push('/');
        }
    },[currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length >0){
            setErrors(userErr);     
        }
    },[userErr]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);

    };

    const handleSubmit =  e =>{
        e.preventDefault();
        dispatch(emailSignInStart({email,password}));
  
        
    }

    const handleGoogleSignIn =() => {
        dispatch(googleSignInStart());
    }
    
    
        const configAuthWrapper={
            headline:'Login'
        };

        return (
            
          
                    
                    <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        
                        <form onSubmit={handleSubmit}>
                        {errors.length > 0 && (
                         <ul>
                           {errors.map((err,index) => {
                               return(
                                   <li key={index}>
                                    {err}
                                   </li>
                               )
                           })}
                         </ul>
                         )}
                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={e => setEmail(e.target.value)}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={e => setPassword(e.target.value)}
                            />

                            <div className="links">
                                <Link to="/forgetPassword">
                                    Forgot password?
                                </Link>
                                <Link to="/forgetPassword" className="registerLink">
                                    Register for an account
                                </Link>
                            </div>

                            <Buttons type="submit">
                                Log In
                            </Buttons>

                        <hr class="solid"></hr>

                            <div className="socialSignin">
                               
                                    <span onClick={handleGoogleSignIn} className="googleIconWrap">
                                    <img src={googleIcon} alt="Sign In With Google" className="googleIcon"/>
                                    <img src={googleHoverIcon} alt="Sign In With Google" className="googleIconTop"/>

                                    </span>

                            </div>
                            
                        </form>
                    </div>
                    </AuthWrapper>
           
        );
    }
   


export default SignIn;
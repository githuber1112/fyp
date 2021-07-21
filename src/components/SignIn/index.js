import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './styles.scss';
import {Link,withRouter} from 'react-router-dom';
import Button from './../forms/Button';
import {signInUser, signInWithGoogle, resetAllAuthForms} from './../../redux/User/user.actions';

import AuthWrapper from './../../components/AuthWrapper';
import FormInput from './../forms/FormInput';
import Buttons from './../forms/Button';

const mapState = ({user}) => ({
    signInSuccess: user.signInSuccess
})

const SignIn = props =>{
    const {signInSuccess} = useSelector(mapState);
    const dispatch = useDispatch();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    useEffect(() => {
        if(signInSuccess){
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    },[signInSuccess]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit =  e =>{
        e.preventDefault();
        dispatch(signInUser({email,password}));
  
        
    }

    const handleGoogleSignIn =() => {
        dispatch(signInWithGoogle());
    }
    
    
        const configAuthWrapper={
            headline:'Login'
        };

        return (
            
          
                    
                    <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        
                        <form onSubmit={handleSubmit}>

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
                            </div>

                            <Buttons type="submit">
                                Log In
                            </Buttons>

                        <hr class="solid"></hr>

                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={handleGoogleSignIn}>
                                        Sign In with Google
                                    </Button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    </AuthWrapper>
           
        );
    }
   


export default withRouter(SignIn);
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './styles.scss';
import {Link,useHistory} from 'react-router-dom';
import Button from './../forms/Button';
import {emailSignInStart, googleSignInStart,resetError} from './../../redux/User/user.actions';
import {Divider} from 'antd';
import googleIcon from './../../assets/googleButton.png'
import googleHoverIcon from './../../assets/googleButtonHover.png'
import BounceLoader from "react-spinners/BounceLoader";



import AuthWrapper from './../../components/AuthWrapper';
import FormInput from './../forms/FormInput';
import Buttons from './../forms/Button';

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr,
    loading: user.loading
})

const SignIn = props =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser,userErr,loading} = useSelector(mapState);
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const [errors,setErrors] = useState([]);

    
    useEffect(() => {

        dispatch(resetError());
        resetForm();
    },[])

    useEffect(() => {
   
        if(currentUser){
            resetForm();
            history.push('/');
        }
    },[currentUser]);

    useEffect(() => {
        
        if(Array.isArray(userErr) && userErr.length >0){
            console.log("hi");
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

        return loading ? (
            <div className="loadingDiv">
            <BounceLoader color={'black'} loading={loading}  size={100} />
            </div>
            ) : (
                    
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
                                <Link to="/forgetPassword" onClick={()=> dispatch(resetError())}>
                                    Forgot password?
                                </Link>
                                <Link to="/registration" className="registerLink" onClick={()=> dispatch(resetError())}>
                                    Register for an account
                                </Link>
                            </div>

                            <Buttons type="submit">
                                Log In
                            </Buttons>

                            <Divider style={{borderTopColor:'black'}}>or</Divider>

                            <div className="socialSignin">
                               
                                    <span  className="googleIconWrap">
                                    <img src={googleIcon} alt="Sign In With Google" className="googleIcon"/>
                                    <img src={googleHoverIcon} onClick={handleGoogleSignIn} alt="Sign In With Google" className="googleIconTop"/>

                                    </span>

                            </div>
                            
                        </form>
                    </div>
                    </AuthWrapper>
        )
        
    }
   


export default SignIn;
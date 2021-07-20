import React, { useState } from 'react';
import './styles.scss';
import {Link,withRouter} from 'react-router-dom';
import Button from './../forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils';

import AuthWrapper from './../../components/AuthWrapper';
import FormInput from './../forms/FormInput';
import Buttons from './../forms/Button';



const SignIn = props =>{
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async e =>{
        e.preventDefault();
        

        try{

            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push('/');

        }catch(err){

        }
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
                                    <Button onClick={signInWithGoogle}>
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
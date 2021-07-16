import React, {Component} from 'react';
import './styles.scss';
import {Link} from 'react-router-dom';
import Button from './../forms/Button';
import { signInWithGoogle, auth } from './../../firebase/utils';

import AuthWrapper from './../../components/AuthWrapper';
import FormInput from './../forms/FormInput';
import Buttons from './../forms/Button';

const initialState ={
    email:'',
    password:''
};

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const{name, value} = e.target;
        this.setState({
            [name]:value
        });
    }


    handleSubmit = async e =>{
        e.preventDefault();
        const{email,password} = this.state;

        try{

            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });

        }catch(err){

        }
    }

    render(){
        const {email,password} = this.state;
        const configAuthWrapper={
            headline:'Login'
        };

        return (
            
          
                    
                    <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        
                        <form onSubmit={this.handleSubmit}>

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={this.handleChange}
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
   
};

export default SignIn;
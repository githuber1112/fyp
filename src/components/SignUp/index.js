import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory,Link} from 'react-router-dom';
import './styles.scss';
import {signUpUserStart,resetError} from './../../redux/User/user.actions';
import BounceLoader from "react-spinners/BounceLoader";
import AuthWrapper from './../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from './../forms/Button';


const mapState = ({user}) => ({
    currentUser:user.currentUser,
    userErr: user.userErr,
    loading: user.loading
});

const Signup = props =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser,userErr, loading} = useSelector(mapState);
    const [displayName,setDisplayName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors,setErrors] = useState([]);

    useEffect(() => {

        dispatch(resetError());
        reset();
    },[])

    useEffect(() => {
        if(currentUser){
            alert("Email has been sent. Please check your email to verify your account.");
            reset();
            history.push('/login');
        }
    },[currentUser]);

    useEffect(() => {
 

        if(Array.isArray(userErr) && userErr.length >0){
            console.log(userErr);

            setErrors(userErr);     
        }


    },[userErr]);

    const reset = () =>{
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }
    

 const handleFormSubmit =  event =>{
    event.preventDefault();
    if(!displayName || !email || !password || !confirmPassword){
        alert("Please enter required field.");
        return;
    }

   
   dispatch(signUpUserStart({
       displayName,
       email,
       password,
       confirmPassword
   }));

}


        const configAuthWrapper = {
            headline:'Sign up'
        };

        return loading ? (
            <div className="loadingDiv">
            <BounceLoader color={'black'} loading={loading}  size={100} />
            </div>
            ) : (
           <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
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
                    <form onSubmit={handleFormSubmit}>
                        
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />

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

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />      

                                        
                    <Button type="submit">
                        Register
                    </Button>

                    </form>
                    <div className="backStoreDiv">
                    <Link to ="/" onClick={()=> dispatch(resetError())}>Return To Store</Link>

                               
                    </div> 
                    </div>
                    </AuthWrapper>
             
        );
    }


export default Signup;
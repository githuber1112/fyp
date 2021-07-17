import React, {Component} from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import {auth, handleUserProfile} from './firebase/utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/User/user.actions';
// layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
// pages
import './default.scss';
import Homepage from './pages/Homepage';
import Registration from'./pages/Registration';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';


class App extends Component{

  authListener = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.authListener=auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
       const userRef = await handleUserProfile(userAuth);
       userRef.onSnapshot(snapshot => {
        setCurrentUser({
         
             id:snapshot.id,
             ...snapshot.data()
        });
           
         })

      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.authListener();
  }


  render(){
    const{currentUser} = this.props;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>(
            <HomepageLayout >
              <Homepage />
              </HomepageLayout>
          )}/>
          <Route path="/registration" render={() => currentUser ? <Redirect to="/"/> :(
           
              <Registration currentUser={currentUser} />
          
          )}/>
          <Route path="/login" 
            render={() => currentUser ? <Redirect to ="/" /> : (
                <MainLayout>
                <Login  />
                </MainLayout>
          )}/>
          <Route path="/forgetPassword" render={() => (
            
              <ForgetPassword />
           
          )}/>
        </Switch>
        
      </div>
    );
  }
}  

const mapStateToProps= ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);

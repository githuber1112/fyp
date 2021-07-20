import React, {useEffect} from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import {auth, handleUserProfile} from './firebase/utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/User/user.actions';


//hoc
import WithAuth from './hoc/withAuth';

// layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
// pages
import './default.scss';
import Homepage from './pages/Homepage';
import Registration from'./pages/Registration';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Dashboard from './pages/Dashboard';

const App = props =>{
  const {setCurrentUser, currentUser} = props;

  useEffect(() => {
    

    const authListener=auth.onAuthStateChanged( async userAuth => {
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

    return () =>{
      authListener();
    };
  }, []);

  


 
   
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>(
            <HomepageLayout >
              <Homepage />
              </HomepageLayout>
          )}/>
          <Route path="/registration" render={() => (
           
              <Registration  />
          
          )}/>
          <Route path="/login" 
            render={() => (
                
                <Login  />
                
          )}/>
          <Route path="/forgetPassword" render={() => (
            
              <ForgetPassword />
           
          )}/>
          <Route path="/dashboard" render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
         
        )}/>
        </Switch>
        
      </div>
    );
  }


const mapStateToProps= ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(App);

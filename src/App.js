import React, {useEffect} from 'react';
import { Switch,Route } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {checkUserSession} from './redux/User/user.actions';


//components
import AdminToolbar from './components/AdminToolbar';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

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
import Admin from './pages/Admin';

const App = props =>{
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  


 
   
    return (
      <div className="App">
        <AdminToolbar />
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
         <Route path="/admin" render={() => (
            <WithAdminAuth>
            <MainLayout>
            <Admin />
            </MainLayout>
            </WithAdminAuth>
         
        )}/>
        </Switch>
        
      </div>
    );
  }



export default App;

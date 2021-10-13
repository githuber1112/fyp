import React, {useEffect} from 'react';
import { Switch,Route } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {checkUserSession} from './redux/User/user.actions';

import 'antd/dist/antd.css'

import ScrollToTop from './ScrollToTop';

//components
import AdminToolbar from './components/AdminToolbar';

//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashBoardLayout from './layouts/DashboardLayout';

// pages
import './default.scss';
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from'./pages/Registration';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Dashboard from './pages/Dashboard';
import AdminManageProduct from './pages/AdminManageProduct';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Order from './pages/Order';
import AboutUsPage from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import ProfileDetails from './pages/ProfileDetails';
import ChatBot from './components/Chatbot';
const App = props =>{
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  


 
   
    return (
      <div className="App">
        <AdminToolbar />
        <ScrollToTop>
        <Switch>
          <Route exact path="/" render={() =>(
            <MainLayout >
              <Homepage />
              </MainLayout>
          )}/>
          <Route exact path="/search" render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}/>
          <Route path="/search/:filterType" render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}/>
          <Route path="/product/:productID" render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}/>
          <Route path="/cart" render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )}/>
          <Route path="/payment" render={() => (
            <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>
            </WithAuth>
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
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </WithAuth>
         
        )}/>
        <Route path="/profile" render={() => (
            <WithAuth>
              <DashBoardLayout>
                <ProfileDetails />
              </DashBoardLayout>
            </WithAuth>
         
        )}/>
        <Route path="/order/:orderID" render ={() => (
          <WithAuth>
            <DashBoardLayout>
              <Order />
            </DashBoardLayout>
          </WithAuth>
        )}/>
         <Route path="/manageproduct" render={() => (
            <WithAdminAuth>
             <AdminLayout>
                <AdminManageProduct />
              </AdminLayout>
            </WithAdminAuth>
         
        )}/>
          <Route path="/addproduct" render={() => (
            <WithAdminAuth>
             <AdminLayout>
                <AdminAddProduct />
              </AdminLayout>
            </WithAdminAuth>
         
        )}/>
         <Route path="/admindashboard" render={() => (
            <WithAdminAuth>
             <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </WithAdminAuth>
         
        )}/>
         <Route path="/aboutus" render={() => (
           <MainLayout>
           <AboutUsPage  />
           </MainLayout>
       )}/>
       <Route path="/contactus" render={() => (
           <MainLayout>
           <ContactUs  />
           </MainLayout>
       )}/>
       <Route path="/chatbot" render={() => (
      
           <ChatBot/>

       )}/>
       
        </Switch>
        </ScrollToTop>
      </div>
    );
  }



export default App;

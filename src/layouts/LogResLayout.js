import React from 'react';
import Header from './../components/header';
import Footer from './../components/Footer';

const LogResLayout= props =>{
    return(
       
           
            <div className="main">
                {props.children}
            </div>
           
     
    );
};

export default LogResLayout;
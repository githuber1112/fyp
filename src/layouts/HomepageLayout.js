import React from 'react';
import Header from './../components/header';
import Footer from './../components/Footer';

const HomepageLayout= props =>{
    return(
        <div className="fullHeight">
                <Header {...props} />
             {props.children}
                <Footer />
            
        </div>
    );
};

export default HomepageLayout;
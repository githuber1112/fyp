import React from 'react';
import Directory from './../../components/Directory';
import './styles.scss';
import ChatBot from './../../components/Chatbot/index';
import Card from '../../components/Card';
import HeroSection from '../../components/Hero';

const Homepage = props =>{
    return (
        <div>
           <HeroSection />
           <Card />
           <Directory />
           <ChatBot />
           </div>
        
    );
};

export default Homepage;
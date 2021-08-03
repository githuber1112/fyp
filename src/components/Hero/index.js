import React from 'react';
import heroPicture from './../../assets/heropicture.jpg'
import './styles.scss'
import Button from './../forms/Button'

function HeroSection() {
    return(
        <div className="hero-container">
            
            <p>Elonmask is a leading online store. 
               We provide an unparalleled selection of quality products, an easy shopping experience, expedited shipping offers, and exceptional customer service. 
               Check out our store today.</p>
               <div className="hero-btns">
                   <Button >
                       Shop Now >
                   </Button>
               </div>
        </div>
    )
}

export default HeroSection;
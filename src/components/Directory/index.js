import React from 'react';
import ShopMask from './../../assets/ShopMask.jpg';
import ShopSanitizer from './../../assets/ShopSanitizer.jpg';
import './styles.scss'

const Directory = props =>{
    return(
        <div className="directory">
            <div className="wrap">
               
            <div
            className="item"
            style={{
                backgroundImage: `url(${ShopMask})`
            }}
            ><h1>FAce Mask</h1>
                <a>
                    Shop now
                </a>
            </div>
            <div className="item"
            style={{
                backgroundImage: `url(${ShopSanitizer})`
            }}
            >
                <h1>Sanitizer</h1>
                <a>
                    Shop now
                </a>
                
            </div>
            </div>
        </div>
    );
};

export default Directory;
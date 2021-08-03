import React from 'react';
import ShopMask from './../../assets/ShopMask.jpg';
import ShopSanitizer from './../../assets/ShopSanitizer.jpg';
import { Link } from 'react-router-dom';
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
             <Link to ="/search/facemask">
                <a>
                    Shop now
                </a>
                </Link>
            </div>
            <div className="item"
            style={{
                backgroundImage: `url(${ShopSanitizer})`
            }}
            >
                <h1>Sanitizer</h1>
                <Link to ="/search/sanitizer">
                <a>
                    Shop now
                </a>
                </Link>
                
            </div>
            </div>
        </div>
    );
};

export default Directory;
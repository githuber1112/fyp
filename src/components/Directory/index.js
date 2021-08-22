import React from 'react';
import ShopMask from './../../assets/ShopMask.jpg';
import ShopSanitizer from './../../assets/ShopSanitizer.jpg';
import { Link } from 'react-router-dom';
import './styles.scss'
import {Row,Col} from 'antd';
import Button from '../forms/Button';

const Directory = props =>{
    return(
        <div className="directoryWrapper">
        <Row gutter={[48,48]}>
          <Col span={12} lg={{span:12}} xl={{span:12}} sm={{span:24}} xs={{span:24}}>
                <div className="faceMaskPoster">
                <div className="textBottomDirectory">
        <h1>Face Mask</h1>
          <a href="search/facemask">
              Shop Now
          </a>
          </div>
                </div>
            </Col>
          <Col span={12} span={12} lg={{span:12}} xl={{span:12}} sm={{span:24}} xs={{span:24}}>
              <div className="sanitizerPoster">
              <div className="textBottomDirectory">
        <h1>Sanitizer</h1>
          <a href="search/sanitizer">
              Shop Now
          </a>
          </div>
              </div>
            </Col>
        </Row>
               
            </div>
    );
};

export default Directory;
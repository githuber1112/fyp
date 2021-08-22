import React from 'react';
import './styles.scss';
import { Row, Col } from 'antd';

const Details2 = () => {
    return (
        <div className="details1Wrapper">
    <Row gutter={[48,48]}>
      <Col span={12} lg={{span:12}} xl={{span:12}} sm={{span:24}} xs={{span:24}}>
      <div className="textWrap">
          <h2>What it takes to make our products.</h2>
          <div className="textDesc">
              <p>Our product is made with the finest product with affordable price.</p>
          </div>
               </div>
        </Col>
      <Col span={12} lg={{span:12}} xl={{span:12}} sm={{span:24}} xs={{span:24}}>
          
               <div className="posterWrap2">
            </div>
        </Col>
    </Row>
           
        </div>
    );

};

export default Details2;
import React from 'react';
import './styles.scss';
import { Row, Col } from 'antd';

const Details1 = () => {
    return (
        <div className="details1Wrapper">
    <Row gutter={[48,48]}>
      <Col span={12} lg={{span:12}} xl={{span:12}} sm={{span:24}} xs={{span:24}}>
            <div className="posterWrap">
            </div>
        </Col>
      <Col span={12} lg={{span:12}} xl={{span:12}} sm={{span:24}} xs={{span:24}}>
          <div className="textWrap">
          <h2>How we started</h2>
          <div className="textDesc">
              <p>We started at 2020. The emergence of covid 19 has inspired us to build this e-commerce. We want to help more people in need worldwide.</p>
          </div>
               </div>
        </Col>
    </Row>
           
        </div>
    );

};

export default Details1;
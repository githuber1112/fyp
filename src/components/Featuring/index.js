import React from "react";
import "./styles.scss";
import { Row, Col } from "antd";

const Featuring = () => {
  return (
    <div className="featuringWrapper">
      <Row gutter={[32, 24]}>
        <Col span={24}>
          <div className="feature1"></div>
        </Col>
        <Col span={24}></Col>
        <Col span={8}>
          <div className="feature2"></div>
        </Col>
        <Col span={8}>
          <div className="feature3"></div>
        </Col>
        <Col span={8}>
          <div className="feature4"></div>
        </Col>
      </Row>
    </div>
  );
};

export default Featuring;

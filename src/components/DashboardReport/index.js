import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import Button from "./../../components/forms/Button";

import { Row, Col, Form, Select, Table } from "antd";

import moment from "moment";
import { useHistory } from "react-router-dom";
import { getAllRecentOrderHistoryStart } from "../../redux/Orders/orders.actions";
import ComponentToPrint from "./ComponentToPrint";

const mapState = ({ ordersData }) => ({
  orderHistory: ordersData.orderHistory.data,
});

const DashboardReport = () => {
  const { loading, status, orderHistory } = useSelector(mapState);
  const dispatch = useDispatch();
  const [reportCategory, setReportCategory] = useState("recentOrders");
  const { Option } = Select;
  const history = useHistory();
  const componentRef = useRef();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    printRecentOrder();
    console.log("hi");
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    dispatch(getAllRecentOrderHistoryStart());
  }, []);

  const printRecentOrder = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {!formSubmitted ? (
        <div>
          <Row gutter={[40, 0]}>
            <Col span={23}>
              <h2 style={{ textAlign: "center" }}>Report Generator</h2>
            </Col>
          </Row>

          <Row gutter={[40, 0]}>
            <Col span={18}>
              <Form {...layout} onFinish={handleSubmit}>
                <Form.Item
                  name="reportCategory"
                  label="Report Category"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select a report category!",
                    },
                  ]}
                >
                  <Select placeholder="Please select a report category">
                    <Option value="recentOrders">Recent Orders Report</Option>
                    <Option value="monthlyReport">Monthly Report</Option>
                    <Option value="salesReport">Sales Report</Option>
                    <Option value="topSelling">Top Selling Report</Option>
                  </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    onClick={() => {
                      setFormSubmitted(true);
                      console.log(orderHistory);
                    }}
                  >
                    GENERATE
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      ) : (
        <ComponentToPrint props={orderHistory} />
      )}
    </>
  );
};

export default DashboardReport;

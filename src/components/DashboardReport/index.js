import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";

import Button from "./../../components/forms/Button";

import { Row, Col, Form, Select } from "antd";

import moment from "moment";
import { useHistory } from "react-router-dom";
import { getRecentOrderHistoryStart } from "../../redux/Orders/orders.actions";

const mapState = ({ ordersData }) => ({
  orderHistory: ordersData.orderHistory.data,
});

const DashboardReport = () => {
  const { loading, status } = useSelector(mapState);
  const dispatch = useDispatch();
  const [reportCategory, setReportCategory] = useState("recentOrders");
  const { Option } = Select;
  const history = useHistory();
  const { orderHistory } = useSelector(mapState);

  const handleSubmit = () => {
    // if (value == "recentOrders") {
    // }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // const Example = () => {
  //   const componentRef = useRef();
  //   const handlePrint = useRefToPrint({
  //     content: () => componentRef.current,
  //   });
  // };

  useEffect(() => {
    dispatch(getRecentOrderHistoryStart());
  }, []);

  //recentorder report
  const formatTime = (nanoTime) => {
    return moment(nanoTime.nano).format("DD/MM/YYYY");
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "documentID",
      key: "documentID",
    },
    {
      title: "Order Date",
      dataIndex: "orderCreatedDate",
      key: "orderCreatedDate",
      render: (orderCreatedDate) => formatTime(orderCreatedDate),
    },
    {
      title: "Total (RM)",
      dataIndex: "orderTotal",
      key: "orderTotal",
    },
  ];

  return (
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
                { required: true, message: "Please select a report category!" },
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardReport;

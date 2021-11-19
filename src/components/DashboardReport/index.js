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
import PrintAllOrder from "./PrintAllOrder";
import PrintMonthlySales from "./PrintMonthlySales";
import PrintTopSelling from "./PrintTopSelling";

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
  const [codeType, setCodeType] = useState("");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const [showTopSelling, setShowTopSelling] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleSubmit = (value) => {
    console.log(value);
    if (value.selectMonth != null) {
      setSelectedMonth(value.selectMonth);
    }

    if (value.reportCategory == "allOrdersReport") {
      setShowAllOrders(true);
      setShowMonthly(false);
      setShowTopSelling(false);
    }

    if (value.reportCategory == "monthlySalesReport") {
      setShowMonthly(true);
      setShowAllOrders(false);
      setShowTopSelling(false);
    }

    if (value.reportCategory == "topSellingReport") {
      setShowTopSelling(true);
      setShowMonthly(false);
      setShowAllOrders(false);
    }
  };

  const handleChange = (value) => {
    console.log(value);
    setCodeType(value);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    dispatch(getAllRecentOrderHistoryStart());
  }, []);

  const printAllOrder = useReactToPrint({
    content: () => componentRef.current,
  });

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
                {
                  required: true,
                  message: "Please select a report category!",
                },
              ]}
            >
              <Select
                placeholder="Please select a report category"
                onChange={(e) => handleChange(e)}
              >
                <Option value="allOrdersReport">All Orders Report</Option>
                <Option value="monthlySalesReport">Monthly Sales Report</Option>
                <Option value="topSellingReport">Top Selling Report</Option>
              </Select>
            </Form.Item>
            {codeType == "monthlySalesReport" && (
              <Form.Item
                label="Select Month"
                name="selectMonth"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select a month!",
                  },
                ]}
              >
                <Select placeholder="Please select a report category">
                  <Option value="January">January</Option>
                  <Option value="Febuary">Febuary</Option>
                  <Option value="March">March</Option>
                  <Option value="April">April</Option>
                  <Option value="May">May</Option>
                  <Option value="June">June</Option>
                  <Option value="July">July</Option>
                  <Option value="August">August</Option>
                  <Option value="September">September</Option>
                  <Option value="October">October</Option>
                  <Option value="November">November</Option>
                  <Option value="December">December</Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                GENERATE
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {showAllOrders && <PrintAllOrder props={orderHistory} />}
      {showMonthly && <PrintMonthlySales props={selectedMonth} />}
      {showTopSelling && <PrintTopSelling />}
    </div>
  );
};

export default DashboardReport;

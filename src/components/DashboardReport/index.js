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

  const handleSubmit = (value) => {
    console.log(value);
    // switch (value) {
    //   case "allOrdersReport":
    //     return;
    //     <PrintAllOrder props={orderHistory} />;
    //     printAllOrder();
    //     console.log("hi");
    //   case "monthlySalesReport":
    //     return;
    //     <PrintMonthlySales />;
    //   case "topSellingReport":
    //     return;
    //     <PrintTopSelling />;
    // }
  };

  const handleChange = () => {
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
                  <Select
                    placeholder="Please select a report category"
                    onChange={handleChange()}
                  >
                    <Option value="allOrdersReport">All Orders Report</Option>
                    <Option value="monthlySalesReport">
                      Monthly Sales Report
                    </Option>
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
                      <Option value="january">January</Option>
                      <Option value="febuary">Febuary</Option>
                      <Option value="march">March</Option>
                      <Option value="april">April</Option>
                      <Option value="may">May</Option>
                      <Option value="june">June</Option>
                      <Option value="july">July</Option>
                      <Option value="august">August</Option>
                      <Option value="september">September</Option>
                      <Option value="october">October</Option>
                      <Option value="november">November</Option>
                      <Option value="december">December</Option>
                    </Select>
                  </Form.Item>
                )}

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
        <PrintAllOrder props={orderHistory} />
      )}
    </>
  );
};

export default DashboardReport;

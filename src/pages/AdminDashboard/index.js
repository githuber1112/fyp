import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, Col, Row, Table } from "antd";
import { firestore } from "./../../firebase/utils";

import moment from "moment";
import { useHistory } from "react-router-dom";
import { getRecentOrderHistoryStart } from "../../redux/Orders/orders.actions";

const dataSales = {
  labels: ["January", "Febuary", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Total Sales",
      data: [400, 1000, 800, 950, 1200, 1100],
      fill: false,
      backgroundColor: "rgb(255,99,132)",
      borderColor: "rgba(255,99,132,0.2)",
    },
  ],
};

const dataCustomers = {
  labels: ["January", "Febuary", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Customers Served",
      data: [100, 250, 200, 120, 300, 280],
      fill: true,
      backgroundColor: [
        "rgb(255,99,132,0.6)",
        "rgb(54,162,235,0.6)",
        "rgb(255,206,86,0.6)",
        "rgb(75,192,192,0.6)",
        "rgb(153,102,255,0.6)",
        "rgb(255,159,64,0.6)",
      ],
    },
  ],
};

const dataBestSellers = {
  labels: [
    "Callie N95 Mask",
    "Callie 4-ply Mask",
    "Hand Sanitizer",
    "Callie Blackout Mask",
  ],
  datasets: [
    {
      label: "Top Selling Products",
      data: [10, 30, 40, 20],
      fill: false,
      backgroundColor: [
        "rgb(255,99,132,0.6)",
        "rgb(54,162,235,0.6)",
        "rgb(255,206,86,0.6)",
        "rgb(75,192,192,0.6)",
      ],
    },
  ],
};

const optionsSales = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const optionsCustomers = {
  type: "bar",
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const optionsBestSellers = {
  type: "pie",
  options: {
    responsive: true,
  },
};

//recent orders
/*const columns = [
  {
    id: "orderCreatedDate",
    lable: "Order Date",
  },
  {
    id: "documentID",
    lable: "Order ID",
  },
  {
    id: "orderTotal",
    lable: "Amount",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `RM${columnValue}`;
    case "orderCreatedDate":
      return moment(columnValue.nano).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};*/

const mapState = ({ ordersData }) => ({
  orderHistory: ordersData.orderHistory.data,
});

const AdminDashboard = ({ orders }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { orderHistory } = useSelector(mapState);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  const fetchTotalCustomers = () => {
    try {
      firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          setCustomerCount(snapshot.size);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalOrders = () => {
    try {
      firestore
        .collection("orders")
        .get()
        .then((snapshot) => {
          setOrderCount(snapshot.size);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTotalProducts = () => {
    try {
      firestore
        .collection("products")
        .get()
        .then((snapshot) => {
          setProductsCount(snapshot.size);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getRecentOrderHistoryStart());

    fetchTotalCustomers();
    fetchTotalOrders();
    fetchTotalProducts();
  }, []);

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
    <div className="adminDashboardWrapper">
      <table>
        <tbody>
          <tr>
            <td width="330px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3>Total Customers</h3>
                <h1>{customerCount}</h1>
              </Card>
            </td>
            <td width="330px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3>Total Orders</h3>
                <h1>{orderCount}</h1>
              </Card>
            </td>
            <td width="330px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3>Total Products</h3>
                <h1>{productsCount}</h1>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td width="500px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="totalSales">
                  <h3>Total Sales</h3>
                  <Line data={dataSales} options={optionsSales} />
                </div>
              </Card>
            </td>

            <td width="500px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="customersServed">
                  <h3>Customers Served</h3>
                  <Bar data={dataCustomers} options={optionsCustomers} />
                </div>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td width="500px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="recentOrders">
                  <h3>Recent Orders</h3>
                  <Table
                    columns={columns}
                    dataSource={orderHistory}
                    pagination={false}
                  />
                </div>
              </Card>
            </td>
            <td width="500px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="bestSellers">
                  <h3>Top Selling Products</h3>
                  <Pie data={dataBestSellers} options={optionsBestSellers} />
                </div>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>

      {/* test recent orders */}
    </div>
  );
};

export default AdminDashboard;

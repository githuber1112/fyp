import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, Col, Row, Table } from "antd";
import { firestore } from "./../../firebase/utils";

import moment from "moment";
import { useHistory } from "react-router-dom";
import { getRecentOrderHistoryStart } from "../../redux/Orders/orders.actions";

//bestsellers get data from firestore (labels)

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
  const [topProductName, setTopProductName] = useState([]);
  const [topProductQuantity, setTopProductQuantity] = useState([]);
  const [topSales, setTopSales] = useState(0);
  const [faceMaskSold, setFaceMaskSold] = useState(0);
  const [sanitizerSold, setSanitizerSold] = useState(0);

  const handleGetBestsellerLabel = () => {
    const topSellingRef = firestore
      .collection("dashboard")
      .doc("topSelling")
      .collection("products")
      .orderBy("totalSold", "desc")
      .limit(5);

    topSellingRef.get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().totalSold != null) {
          setTopProductName((topProductName) => [
            ...topProductName,
            doc.data().productName,
          ]);

          setTopProductQuantity((topProductQuantity) => [
            ...topProductQuantity,
            doc.data().totalSold,
          ]);
        }
      });
    });
  };

  const dataBestSellers = {
    labels: topProductName,
    datasets: [
      {
        label: "Top Selling Products",
        data: topProductQuantity,
        fill: true,
        backgroundColor: [
          "rgb(255,99,132,0.6)",
          "rgb(54,162,235,0.6)",
          "rgb(255,206,86,0.6)",
          "rgb(75,192,192,0.6)",
          "rgb(153,102,255,0.6)",
        ],
      },
    ],
  };

  const handleGetMonthlySalesLabel = () => {
    let salesAmount = 0;
    var currentDate = moment().format("MMMM");

    const topSalesRef = firestore
      .collection("dashboard")
      .doc("monthlySales")
      .collection(currentDate);

    topSalesRef.get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().totalAmount != null) {
          salesAmount = salesAmount + doc.data().totalAmount;
        }
        setTopSales(salesAmount);
      });
    });
  };

  //ask kj about the label here
  const dataSales = {
    labels: [moment().format("MMMM")],
    datasets: [
      {
        label: "Total Sales",
        data: [topSales],
        fill: false,
        backgroundColor: "rgb(255,99,132)",
        borderColor: "rgba(255,99,132,0.2)",
      },
    ],
  };

  const handleGetProductSoldByCategory = () => {
    var faceMaskSale = 0;
    var sanitizerSale = 0;
    const topSellingRef = firestore
      .collection("dashboard")
      .doc("topSelling")
      .collection("products");

    topSellingRef
      .where("productCategory", "==", "facemask")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().totalSold != null) {
            faceMaskSale = faceMaskSale + doc.data().totalSold;
          }
        });
        setFaceMaskSold(faceMaskSale);
      });

    topSellingRef
      .where("productCategory", "==", "sanitizer")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().totalSold != null) {
            sanitizerSale = sanitizerSale + doc.data().totalSold;
          }
        });
        setSanitizerSold(sanitizerSale);
      });

    console.log(faceMaskSale);
  };

  const dataCustomers = {
    labels: ["Face mask", "Alcohol Sanitizer"],
    datasets: [
      {
        label: "Top Selling Products",
        data: [faceMaskSold, sanitizerSold],
        fill: true,
        backgroundColor: ["rgb(255,99,132,0.6)", "rgb(54,162,235,0.6)"],
      },
    ],
  };

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
    handleGetBestsellerLabel();
    handleGetMonthlySalesLabel();
    handleGetProductSoldByCategory();
  }, []);

  const formatTime = (nanoTime) => {
    return moment(nanoTime.toDate()).format("DD/MM/YYYY");
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
            <td width="200px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3 style={{ textAlign: "center" }}>Total Customers</h3>
                <h1 style={{ textAlign: "center" }}>{customerCount}</h1>
              </Card>
            </td>
            <td width="200px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3 style={{ textAlign: "center" }}>Total Orders</h3>
                <h1 style={{ textAlign: "center" }}>{orderCount}</h1>
              </Card>
            </td>
            <td width="200px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3 style={{ textAlign: "center" }}>Total Products</h3>
                <h1 style={{ textAlign: "center" }}>{productsCount}</h1>
              </Card>
            </td>
            <td width="400px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="totalSales">
                  <h3 style={{ textAlign: "center" }}>
                    Total Sales for month : {moment().format("MMMM")}
                  </h3>
                  <h1 style={{ textAlign: "center" }}>RM {topSales}</h1>
                </div>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td width="450px">
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
            <td width="550px">
              <Card
                style={{
                  borderRadius: "15px",
                  margin: "10px",
                  borderColor: "white",
                  boxShadow: "0 7px 25px rgba(0,0,0,0.2)",
                }}
              >
                <div className="customersServed">
                  <h3>Product Sold by Category</h3>
                  <Bar data={dataCustomers} options={optionsCustomers} />
                </div>
              </Card>
            </td>
          </tr>
        </tbody>
      </table>

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

      {/* test recent orders */}
    </div>
  );
};

export default AdminDashboard;

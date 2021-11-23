import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Table } from "antd";
import moment from "moment";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import { Pie } from "react-chartjs-2";
import Button from "./../../components/forms/Button";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import elonLogo from "./../../assets/elonLogo.JPG";
import { firestore } from "./../../firebase/utils";

const PrintTopSelling = () => {
  const [topProductName, setTopProductName] = useState([]);
  const [topProductQuantity, setTopProductQuantity] = useState([]);
  const [topSellerDetails, setTopSellerDetails] = useState([]);

  useEffect(() => {
    handleGetBestsellerLabel();
    fetchTopSeller();
  }, []);

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

  const fetchTopSeller = () => {
    const topProduct = firestore
      .collection("dashboard")
      .doc("topSelling")
      .collection("products")
      .orderBy("totalSold", "desc")
      .limit(5);

    topProduct.get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        setTopSellerDetails((details) => [
          ...details,
          [doc.id, doc.data().productName, doc.data().totalSold],
        ]);
        console.log(topSellerDetails);
      });
    });
  };

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    //unit: "in",
    //format: [4, 2],
  };
  const optionsBestSellers = {
    type: "pie",
    options: {
      responsive: true,
    },
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

  const formatTime = (nanoTime) => {
    return moment(nanoTime.toDate()).format("DD/MM/YYYY");
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "documentID",
      key: "documentID",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Total Sold",
      dataIndex: "totalSold",
      key: "totalSold",
    },
  ];
  //monthlysales report
  const jsPdfGenerator = () => {
    var doc = new jsPDF("p", "pt");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var col = ["Product ID", "Product Name", "Total Sold"];
    var row = topSellerDetails;

    today = dd + "/" + mm + "/" + yyyy;

    doc.addImage(elonLogo, "JPG", 240, 20, 100, 40);
    // <Table columns={columns} dataSource={props.props} pagination={false} />;
    doc.text(210, 80, "- Top Selling Report -");
    doc.setFontSize(12);
    doc.text(40, 120, "Report Generated as of ");
    doc.text(170, 120, today);
    doc.autoTable(col, row, { startY: 140 });

    // set the font of the pdf document
    doc.setFont("courier");

    //save the pdf document
    doc.save("Top_Selling_Report.pdf");
  };

  return (
    <>
      <div ref={ref}>
        <h3>Top Selling Report</h3>
        <div style={{ padding: "150px" }}>
          {/* <Pie data={dataBestSellers} options={optionsBestSellers} /> */}
          <Table
            columns={columns}
            dataSource={topSellerDetails}
            pagination={false}
          />
        </div>
      </div>

      <Button onClick={jsPdfGenerator}>DOWNLOAD REPORT</Button>
    </>
  );
};

export default PrintTopSelling;

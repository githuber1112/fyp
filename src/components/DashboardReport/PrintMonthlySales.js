import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import Button from "./../../components/forms/Button";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import elonLogo from "./../../assets/elonLogo.JPG";
import { firestore } from "../../firebase/utils";

const PrintMonthlySales = (props) => {
  const [salesDetailsID, setSalesDetailsID] = useState([]);
  const [salesDetailsDate, setSalesDetailsDate] = useState([]);
  const [salesDetailsAmount, setSalesDetailsAmount] = useState([]);
  const [salesDetails, setSalesDetails] = useState([]);
  const [salesTable, setSalesTable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  useEffect(() => {
    console.log(salesTable);
    setLoading(false);
  }, [salesTable]);

  const fetchMonthlySales = () => {
    console.log(props);
    const salesThisMonth = firestore
      .collection("dashboard")
      .doc("monthlySales")
      .collection(props.props);

    salesThisMonth.get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        setSalesDetails((details) => [
          ...details,
          [doc.id, formatTime(doc.data().createdDate), doc.data().totalAmount],
        ]);
        let i = 0;
        setSalesTable((prevState) => ({
          ...prevState,
          [i]: {
            documentID: doc.id,
            createdDate: formatTime(doc.data().createdDate),
            totalAmount: doc.data().totalAmount,
          },
        }));
        i++;
        console.log(salesDetails);
      });
    });
  };

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    //unit: "in",
    //format: [4, 2],
  };

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
      dataIndex: "createdDate",
      key: "orderCreatedDate",
      //render: (orderCreatedDate) => formatTime(orderCreatedDate),
    },
    {
      title: "Total (RM)",
      dataIndex: "totalAmount",
      key: "orderTotal",
    },
  ];

  //monthlysales report
  const jsPdfGenerator = () => {
    var doc = new jsPDF("p", "pt");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var col = ["Order ID", "Order Date", "Total (RM)"];
    var row = salesDetails;

    //print
    today = dd + "/" + mm + "/" + yyyy;

    doc.addImage(elonLogo, "JPG", 240, 20, 100, 40);
    //<Table columns={columns} dataSource={props.props} pagination={false} />;
    doc.text(210, 80, "- Monthly Sales Report -");

    doc.setFontSize(12);
    doc.text(40, 120, "Report Generated as of ");
    doc.text(170, 120, today);
    doc.autoTable(col, row, { startY: 140 });

    //set the font of the pdf document
    doc.setFont("courier");

    //save the pdf document
    doc.save("Monthly_Sales_Report.pdf");
  };

  return loading ? (
    <div></div>
  ) : (
    <>
      <div ref={ref}>
        <h3>Monthly Sales Report</h3>
        <Table columns={columns} dataSource={salesTable} pagination={false} />
      </div>

      <Button onClick={jsPdfGenerator}>DOWNLOAD REPORT</Button>
    </>
  );
};

export default PrintMonthlySales;

import React, { useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import Button from "./../../components/forms/Button";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import elonLogo from "./../../assets/elonLogo.JPG";
import { firestore } from "../../firebase/utils";

const PrintMonthlySales = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  const fetchMonthlySales = () => {
    const salesThisMonth = firestore
      .collection("dashboard")
      .doc("monthlySales")
      .collection("November");
    //get current month?

    try {
      salesThisMonth.get().then((snapshot) => {
        snapshot.docs.map(doc);
      });
    } catch (e) {
      console.log(e);
    }
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

  //monthlysales report
  const jsPdfGenerator = () => {
    var doc = new jsPDF("p", "pt");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var col = ["Order ID", "Order Date", "Total (RM)"];
    var row = [];

    //print
    today = dd + "/" + mm + "/" + yyyy;

    doc.addImage(elonLogo, "JPG", 240, 20, 100, 40);
    //<Table columns={columns} dataSource={props.props} pagination={false} />;
    doc.text(220, 80, "- Monthly Sales Report -");
    doc.text(20, 120, "Report Generated as of ");
    doc.text(190, 120, today);
    doc.autoTable(col, row, { startY: 140 });

    //set the font of the pdf document
    doc.setFont("courier");

    //save the pdf document
    doc.save("Monthly_Sales_Report.pdf");
  };

  return (
    <>
      <div ref={ref}>
        <h3>Monthly Sales Report</h3>
      </div>

      <Button onClick={jsPdfGenerator}>DOWNLOAD REPORT</Button>
    </>
  );
};

export default PrintMonthlySales;

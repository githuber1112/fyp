import React, { useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import Pdf from "react-to-pdf";
import jsPDF from "jspdf";
import Button from "./../../components/forms/Button";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import elonLogo from "./../../assets/elonLogo.JPG";
import "jspdf-autotable";

// Create styles
// const styles = StyleSheet.create({
//   margins = {
//     top: 80,
//     bottom: 60,
//     left: 40,
//     width: 522
// }
// page: {
//   flexDirection: "row",
//   backgroundColor: "#E4E4E4",
// },
// section: {
//   margin: 10,
//   padding: 10,
//   flexGrow: 1,
// },
// });

const PrintAllOrder = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    //unit: "in",
    //format: [4, 2],
  };
  //recentorder report
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

  const jsPdfGenerator = () => {
    //new document in jspdf

    const orderHistory = props.props;

    var doc = new jsPDF("p", "pt");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    var col = ["Order ID", "Order Date", "Total (RM)"];
    var row = [];

    orderHistory.map((item) => {
      var orderDetails = [
        item.documentID,
        formatTime(item.orderCreatedDate),
        item.orderTotal,
      ];
      console.log(row);
      row.push(orderDetails);
    });

    today = dd + "/" + mm + "/" + yyyy;

    doc.addImage(elonLogo, "JPG", 240, 20, 100, 40);
    //<Table columns={columns} dataSource={props.props} pagination={false} />;
    doc.text(220, 80, "- All Orders Report -");

    doc.setFontSize(12);
    doc.text(40, 120, "Report Generated as of ");
    doc.text(170, 120, today);

    doc.autoTable(col, row, { startY: 140 });

    //set the font of the pdf document
    doc.setFont("courier");

    //save the pdf document
    doc.save("All_Orders_Report.pdf");
  };
  return (
    <>
      <div ref={ref}>
        <h3>All Orders Report</h3>
        <Table columns={columns} dataSource={props.props} pagination={false} />
      </div>
      {/* <Pdf
        targetRef={ref}
        filename="Recent_Orders_Report.pdf"
        options={options}
      >
        {({ toPdf }) => <Button onClick={toPdf}>DOWNLOAD REPORT</Button>}
      </Pdf> */}

      <Button onClick={jsPdfGenerator}>DOWNLOAD REPORT</Button>
    </>
  );
};

export default PrintAllOrder;

// export class ComponentToPrint extends React.Component {
//   render() {
//     const orderHistory = this.props.orderHistory;

//     console.log(this.props);

//     return (
//       <>

//       </>
//     );
//   }
// }

// const mapStateToProps = ({ ordersData }) => ({
//   orderHistory: ordersData.orderHistory.data,
// });
// export default connect(mapStateToProps)(ComponentToPrint);

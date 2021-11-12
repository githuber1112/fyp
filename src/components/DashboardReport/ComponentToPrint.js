import React, { useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import Pdf from "react-to-pdf";
import Button from "./../../components/forms/Button";

const ComponentToPrint = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
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
  return (
    <>
      <div ref={ref}>
        <h3>Recent Orders Report</h3>
        <Table columns={columns} dataSource={props.props} pagination={false} />
      </div>
      <Pdf
        targetRef={ref}
        filename="Recent_Orders_Report.pdf"
        options={options}
      >
        {({ toPdf }) => <Button onClick={toPdf}>DOWNLOAD REPORT</Button>}
      </Pdf>
    </>
  );
};

export default ComponentToPrint;

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
import React, { useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import Pdf from "react-to-pdf";

const ComponentToPrint = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
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
        <h3>Recent Orders</h3>
        <Table columns={columns} dataSource={props.props} pagination={false} />
      </div>
      <Pdf targetRef={ref} filename="post.pdf" options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
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

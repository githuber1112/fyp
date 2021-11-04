import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "./../../redux/Orders/orders.actions";

const columns = [
  {
    dataIndex: "allImageURL",
    key: "1",
    render: (record) => {
      return <img src={record[0]} width={250} />;
    },
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "2",
  },
  {
    title: "Product Price",
    dataIndex: "productPrice",
    key: "3",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "4",
  },
];

const styles = {
  fontSize: "16px",
  width: "10%",
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);

  return (
    <div>
      <Table
        style={{ background: "red" }}
        pagination={false}
        dataSource={orderItems}
        columns={columns}
      />
    </div>
  );
};

export default OrderDetails;

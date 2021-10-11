import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './../../components/OrderDetails';
import './styles.scss';

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {

    dispatch(
      getOrderDetailsStart(orderID)
    );

  }, []);

  return (
    <div className="orderIDWrapper">

      <h1>
        Order ID: #{orderID}
      </h1>
      <br/>
      <OrderDetails order={orderDetails} />
      <br/>
      <div className="totalPrice">
        <h3>
          Total : RM {orderTotal}
      </h3>
      </div>
      

    </div>
  )

}

export default Order;
import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getUserOrderHistory } from '../../redux/Orders/orders.actions';
import OrderHistory from '../../components/OrderHistory';
import { Divider } from 'antd';
import './styles.scss';

const mapState = ({ user, ordersData }) => ({
    currentUser : user.currentUser,
    orderHistory: ordersData.orderHistory.data
})

const Dashboard = props => {
    const dispatch = useDispatch();
    const {currentUser, orderHistory} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            getUserOrderHistory(currentUser.id)
        )
    },[]);

    return (
        <div className="myOrdersWrapper">
            <h1>
                Order History
            </h1>
            <h5>View your order details below.</h5>
            <Divider />

            <OrderHistory orders={orderHistory} />
        </div>
    );
};

export default Dashboard;
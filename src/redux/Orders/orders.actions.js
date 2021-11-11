import ordersTypes from "./orders.types";

export const saveOrderHistory = (order) => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order,
});

export const saveOrderHistorySuccess = () => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_SUCCESS,
});

export const getUserOrderHistory = (uid) => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid,
});

export const setUserOrderHistory = (history) => ({
  type: ordersTypes.SET_USER_ORDER_HISOTRY,
  payload: history,
});

export const getOrderDetailsStart = (orderID) => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  payload: orderID,
});

export const setOrderDetails = (order) => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  payload: order,
});

export const resetAction = () => ({
  type: ordersTypes.RESET_ACTION,
});

export const getRecentOrderHistoryStart = () => ({
  type: ordersTypes.GET_RECENT_ORDER_HISTORY_START,
});

export const getAllRecentOrderHistoryStart = () => ({
  type: ordersTypes.GET_ALL_RECENT_ORDER_HISTORY_START,
});

export const setRecentOrderHistory = (order) => ({
  type: ordersTypes.SET_RECENT_ORDER_HISTORY,
  payload: order,
});

export const setAllRecentOrderHistory = (order) => ({
  type: ordersTypes.SET_ALL_RECENT_ORDER_HISTORY,
  payload: order,
});

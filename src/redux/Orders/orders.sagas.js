import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
  handleGetRecentOrderHistory,
  handleGetAllRecentOrderHistory,
} from "./orders.helpers";
import { auth } from "./../../firebase/utils";
import { clearCart } from "./../Cart/cart.actions";
import {
  setUserOrderHistory,
  setOrderDetails,
  saveOrderHistorySuccess,
  resetAction,
  setRecentOrderHistory,
  setAllRecentOrderHistory,
} from "./orders.actions";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
    yield all([
      put(saveOrderHistorySuccess()),
      put(clearCart()),
      put(resetAction()),
    ]);
  } catch (err) {
    console.log(err);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    console.log(order);
    yield put(setOrderDetails(order));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export function* getRecentOrderHistory() {
  try {
    const order = yield handleGetRecentOrderHistory();
    yield put(setRecentOrderHistory(order));
  } catch (err) {
    console.log(err);
  }
}

export function* getAllRecentOrderHistory() {
  try {
    const order = yield handleGetAllRecentOrderHistory();
    yield put(setAllRecentOrderHistory(order));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetRecentOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_RECENT_ORDER_HISTORY_START,
    getRecentOrderHistory
  );
}

export function* onGetAllRecentOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_ALL_RECENT_ORDER_HISTORY_START,
    getAllRecentOrderHistory
  );
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onGetRecentOrderHistoryStart),
    call(onGetAllRecentOrderHistoryStart),
  ]);
}

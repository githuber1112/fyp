import ordersTypes from "./orders.types";

const INITIAL_STATE = {
  orderHistory: [],
  orderDetails: {},
  loading: false,
  status: "incomplete",
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ordersTypes.RESET_ACTION:
      return {
        ...state,
        loading: false,
        status: "incomplete",
      };
    case ordersTypes.SAVE_ORDER_HISTORY_START:
      return {
        ...state,
        loading: true,
      };
    case ordersTypes.SAVE_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        status: "complete",
      };
    case ordersTypes.SET_USER_ORDER_HISOTRY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;

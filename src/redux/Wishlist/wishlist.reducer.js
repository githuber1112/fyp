import wishlistTypes from "./wishlist.types";

const INITIAL_STATE = {
  wishlistItems: [],
  status: "incomplete",
  check: false,
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case wishlistTypes.CHECK_WISHLIST_SUCCESS:
      return {
        ...state,
        check: action.payload,
      };

    case wishlistTypes.SET_WISHLIST:
      return {
        wishlistItems: action.payload,
      };
    default:
      return state;
  }
};

export default wishlistReducer;

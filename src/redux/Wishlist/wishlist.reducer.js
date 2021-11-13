import wishlistTypes from "./wishlist.types";

const INITIAL_STATE = {
  wishlistItems: [],
  status: "incomplete",
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default wishlistReducer;

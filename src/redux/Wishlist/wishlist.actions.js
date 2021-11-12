import wishlistTypes from "./wishlist.types";

export const addWishlist = (productID) => ({
  type: wishlistTypes.ADD_TO_WISHLIST,
  payload: productID,
});

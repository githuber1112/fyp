import wishlistTypes from "./wishlist.types";

export const addWishlist = (productID) => ({
  type: wishlistTypes.ADD_TO_WISHLIST,
  payload: productID,
});

export const fetchWishlist = () => ({
  type: wishlistTypes.FETCH_WISHLIST,
});

export const setWishlist = (wishlist) => ({
  type: wishlistTypes.SET_WISHLIST,
  payload: wishlist,
});

export const checkWishlistStart = (productID) => ({
  type: wishlistTypes.CHECK_WISHLIST_START,
  payload: productID,
});

export const checkWishlistSuccess = (result) => ({
  type: wishlistTypes.CHECK_WISHLIST_SUCCESS,
  payload: result,
});

export const removeWishlist = (productID) => ({
  type: wishlistTypes.REMOVE_WISHLIST,
  payload: productID,
});

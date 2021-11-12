import { takeLatest, call, all, put } from "redux-saga/effects";
import { handleAddToWishlist } from "./wishlist.helper";
import wishlistTypes from "./wishlist.types";

export function* addToWishlist(payload) {
  yield handleAddToWishlist(payload);
}

export function* onAddToWishlistStart() {
  yield takeLatest(wishlistTypes.ADD_TO_WISHLIST_START, addToWishlist);
}

export default function* wishlistSagas() {
  yield all([call(onAddToWishlistStart)]);
}

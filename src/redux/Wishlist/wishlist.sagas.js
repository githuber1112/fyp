import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  checkWishlistSuccess,
  fetchWishlist,
  setWishlist,
  checkWishlistStart,
  removeWishlistSuccess,
} from "./wishlist.actions";
import {
  handleAddToWishlist,
  handleCheckWishlist,
  handleFetchWishlist,
  handleRemoveWishlist,
} from "./wishlist.helper";
import wishlistTypes from "./wishlist.types";

export function* addToWishlist({ payload }) {
  try {
    yield handleAddToWishlist(payload);
    yield put(checkWishlistStart(payload.documentID));
  } catch (err) {
    console.log(err);
  }
}

export function* onAddToWishlistStart() {
  yield takeLatest(wishlistTypes.ADD_TO_WISHLIST, addToWishlist);
}

export function* fetchWishlistStart() {
  const wishlist = yield handleFetchWishlist();
  yield put(setWishlist(wishlist));
}

export function* onFetchWishlistStart() {
  yield takeLatest(wishlistTypes.FETCH_WISHLIST, fetchWishlistStart);
}

export function* checkWishlist({ payload }) {
  const result = yield handleCheckWishlist(payload);
  yield put(checkWishlistSuccess(result));
}

export function* onCheckWishlistStart() {
  yield takeLatest(wishlistTypes.CHECK_WISHLIST_START, checkWishlist);
}

export function* removeWishlist({ payload }) {
  yield handleRemoveWishlist(payload);
  yield all([
    put(checkWishlistStart(payload)),
    put(fetchWishlist()),
    put(removeWishlistSuccess()),
  ]);
}

export function* onRemoveWishlistStart() {
  yield takeLatest(wishlistTypes.REMOVE_WISHLIST, removeWishlist);
}

export default function* wishlistSagas() {
  yield all([
    call(onAddToWishlistStart),
    call(onFetchWishlistStart),
    call(onCheckWishlistStart),
    call(onRemoveWishlistStart),
  ]);
}

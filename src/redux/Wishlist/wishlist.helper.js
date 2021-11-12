import { firestore } from "./../../firebase/utils";

export const handleAddToWishlist = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc()
      .collection("wishlist")
      .doc(productID)
      .set(productID)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

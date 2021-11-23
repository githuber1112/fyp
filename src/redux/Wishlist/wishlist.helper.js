import { firestore } from "./../../firebase/utils";
import firebase from "firebase";
import "firebase/auth";

export const handleAddToWishlist = (product) => {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;

    if (uid == null) {
      reject("Not login");
    }

    firestore
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .doc(product.documentID)
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};

export const handleFetchWishlist = () => {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;

    firestore
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .get()
      .then((snapshot) => {
        const productID = snapshot.docs.map((doc) => {
          return doc.data();
        });
        resolve(productID);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleCheckWishlist = (payload) => {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;

    firestore
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .get()
      .then((snapshot) => {
        let exist = false;
        snapshot.docs.map((doc) => {
          if (payload == doc.id) {
            exist = true;
          }
        });
        resolve(exist);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleRemoveWishlist = (payload) => {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid;

    firestore
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .doc(payload)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
};

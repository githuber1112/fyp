import { firestore } from "./../../firebase/utils";
import moment from "moment";

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    const { orderItems } = order;
    var currentDate = moment().format("MMMM");
    const orderRef = firestore.collection("orders").doc();

    orderItems.map((item) => {
      const updateQuantityRef = firestore
        .collection("dashboard")
        .doc("topSelling")
        .collection("products")
        .doc(item.documentID);

      // bestsellers
      updateQuantityRef.get().then((data) => {
        let oldQuantity = data.get("totalSold");
        let newQuantity = item.quantity + oldQuantity;
        updateQuantityRef.update({ totalSold: newQuantity });
      });
    });

    const salesDetails = {
      totalAmount: order.orderTotal,
      createdDate: order.orderCreatedDate,
    };

    orderRef
      .set(order)
      .then(() => {
        firestore
          .collection("dashboard")
          .doc("monthlySales")
          .collection(currentDate)
          .doc(orderRef.id)
          .set(salesDetails)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("orders").orderBy("orderCreatedDate");
    ref = ref.where("orderUserID", "==", uid);

    ref
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetRecentOrderHistory = () => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc");

    ref
      .limit(4)
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//show all recent order for report
export const handleGetAllRecentOrderHistory = () => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc");

    ref

      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snap) => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: orderID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

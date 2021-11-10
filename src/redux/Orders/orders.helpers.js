import { firestore } from "./../../firebase/utils";

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    const { orderItems } = order;

    orderItems.map((item) => {
      const updateQuantityRef = firestore
        .collection("dashboard")
        .doc("topSelling")
        .collection("products")
        .doc(item.documentID);

      const updateSalesRef = firestore
        .collection("dashboard")
        .doc("totalSales");

      // bestsellers
      updateQuantityRef.get().then((data) => {
        let oldQuantity = data.get(item.documentID);
        if (oldQuantity != null) {
          const { totalSold } = oldQuantity;
          let newQuantity = totalSold + item.quantity;
          console.log(oldQuantity);

          const topSelling = {
            [item.documentID]: {
              productID: item.documentID,
              productName: item.productName,
              totalSold: newQuantity,
            },
          };

          updateQuantityRef.set(topSelling, { merge: true });
        } else {
          const topSelling = {
            [item.documentID]: {
              productID: item.documentID,
              productName: item.productName,
              totalSold: item.quantity,
            },
          };
          updateQuantityRef.set(topSelling, { merge: true });
        }
      });

      // total sales
      // updateSalesRef.get().then((data) => {
      //   const totalSales = {
      //     [item.documentID]: {
      //       soldMonth: item.orderedDate,
      //       totalSold: item.price,
      //     },
      //   };
      // });

      // const productID = firestore.documentID;
      // const totalSold = firestore.quantity;
      // const increment = firestore.FieldValue.increment(totalSold);
      //if product ID exist, totalsold + quantity
      // try {
      //   //const { id, ...updateInfo } = payload;
      //   if (productID == documentID) {
      //     firestore
      //       .collection("dashboard")
      //       .doc("topSelling")
      //       .update({ totalSold: increment }, { merge: true })
      //       .then(() => {
      //         resolve();
      //       });
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
      //firestore.collection("dashboard").doc("topSelling").set(topSelling);
    });

    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
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
      //.limit(6)
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

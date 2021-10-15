import { firestore } from "./../../firebase/utils";
import { storage } from "./../../firebase/utils";
import firebase from "firebase";
import React, { useState, useEffect } from "react";
import { fixControlledValue } from "antd/lib/input/Input";
import Compressor from "compressorjs";

export const handleAddProduct = (product) => {
  const promises = [];
  return new Promise((resolve, reject) => {
    const { fileList: fileList, ...productData } = product;
    const uploadFirestore = firestore.collection("products").doc();

    const addProductImage = (i) => {
      return new Promise((resolve) => {
        try {
          new Compressor(fileList[i].originFileObj, {
            quality: 0.8,
            success: (compressedResult) => {
              console.log("Check upload");

              const storageRef = storage
                .ref(
                  `${productData.productCategory}/${uploadFirestore.id}/${fileList[i].name}`
                )
                .put(compressedResult);

              storageRef.on(
                "state_changed",
                (error) => {},
                (snapshot) => {},
                async () => {
                  await storage
                    .ref(
                      `${productData.productCategory}/${uploadFirestore.id}/${fileList[i].name}`
                    )
                    .getDownloadURL()
                    .then((url) => {
                      const imageURL = `imageURL${i}`;
                      const item = [];
                      item[i] = {
                        url: url,
                        uploadedAt: firebase.firestore.Timestamp.now(),
                      };

                      uploadFirestore
                        .set({ [imageURL]: item[i] }, { merge: true })
                        .then(() => resolve());
                    });
                }
              );
            },
          });
        } catch (e) {
          console.log(e);
        }
      });
    };

    try {
      for (let i = 0; i < fileList.length; i++) {
        promises.push(addProductImage(i));
      }
    } catch (e) {
      console.log(e);
    }

    uploadFirestore.set(productData, { merge: true });

    Promise.all(promises)
      .then(() => {
        console.log("checking");
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
  searchProductName,
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 8;
    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize);

    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    if (searchProductName)
      ref = ref.startAt(searchProductName).endAt(searchProductName + "\uf8ff");

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            const allImageURL = [];
            for (let i = 0; i < 5; i++) {
              let imageURL = `imageURL${i}`;

              let image = doc.get(imageURL);
              if (doc.get(imageURL) == null) {
                break;
              }
              allImageURL.push(image.url);
            }

            return {
              allImageURL,
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];
        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProducts = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUpdateProducts = (product) => {
  const uploadFirestore = firestore
    .collection("products")
    .doc(product.documentID);
  const uploadFirestoreId = product.documentID;

  return new Promise((resolve, reject) => {
    const {
      updateFileList: updateFileList,
      documentID,
      ...productData
    } = product;
    let count = 0;
    const promises = [];

    const uploadImage = (i) => {
      return new Promise((resolve) => {
        if (updateFileList[i].originFileObj !== undefined) {
          new Compressor(updateFileList[i].originFileObj, {
            quality: 0.8,
            success: (compressedResult) => {
              const storageRef = storage
                .ref(
                  `${productData.productCategory}/${uploadFirestoreId}/${updateFileList[i].name}`
                )
                .put(compressedResult);

              storageRef.on(
                "state_changed",
                (error) => {},
                (snapshot) => {},
                async () => {
                  await storage
                    .ref(
                      `${productData.productCategory}/${uploadFirestoreId}/${updateFileList[i].name}`
                    )
                    .getDownloadURL()
                    .then((url) => {
                      const imageURL = `imageURL${i}`;
                      const item = [];
                      item[i] = {
                        url: url,
                        uploadedAt: firebase.firestore.Timestamp.now(),
                      };

                      uploadFirestore
                        .set({ [imageURL]: item[i] }, { merge: true })
                        .then(() => {
                          resolve();
                        });
                    });
                }
              );
            },
          });
        } else {
          const imageURL = `imageURL${i}`;
          const item = [];
          item[i] = {
            url: updateFileList[i].url,
          };

          uploadFirestore
            .set({ [imageURL]: item[i] }, { merge: true })
            .then(() => {
              resolve();
            });
        }
      });
    };

    for (let i = 0; i < 5; i++) {
      const imageURL = `imageURL${i}`;
      uploadFirestore.set(
        { [imageURL]: firebase.firestore.FieldValue.delete() },
        { merge: true }
      );
      console.log("deleted" + imageURL);
    }

    for (let i = 0; i < updateFileList.length; i++) {
      try {
        promises.push(uploadImage(i));
      } catch (e) {
        console.log(e);
      }
    }

    Promise.all(promises).then(() => {
      console.log("checking");
      uploadFirestore
        .update(productData)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });

    // firestore
    //   .collection("products")
    //   .doc(product.documentID)
    //   .update(product)
    //   .then(() => {
    //     resolve();
    //   })
    //   .catch((err) => {
    //     reject(err);
    //   });
  });
};

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const allImageURL = [];

          for (let i = 0; i < 5; i++) {
            let imageURL = `imageURL${i}`;
            let image = snapshot.get(imageURL);
            if (snapshot.get(imageURL) == null) {
              break;
            }
            allImageURL.push(image.url);
          }

          const productArray = { allImageURL, ...snapshot.data() };

          resolve(productArray);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .orderBy("createdDate")
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map((doc) => {
          const allImageURL = [];

          for (let i = 0; i < 5; i++) {
            let imageURL = `imageURL${i}`;
            let image = doc.get(imageURL);
            if (doc.get(imageURL) == null) {
              break;
            }
            allImageURL.push(image.url);
          }

          return {
            ...doc.data(),
            allImageURL,
            documentID: doc.id,
          };
        });
        resolve(productsArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

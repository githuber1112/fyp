import { auth } from "./../../firebase/utils";
import { firestore } from "./../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  return new Promise((resolve, reject) => {
    const config = {
      url: "http://localhost:3000/login",
    };
    auth
      .sendPasswordResetEmail(email, config)
       .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not match. Please enter again."];
        reject(err);
      });
  });
};

export const handleUpdateInfo = payload => {
    console.log(payload)
  return new Promise((resolve, reject) => {
try{
    const { id, ...updateInfo } = payload;
    firestore
      .collection("users")
      .doc(id)
      .set(updateInfo, { merge: true })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
    }catch(err){
        console.log(err)
    }
  });
};


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JIqONI7YL55UaIVcujrJ3WScd8syUT0FCt9HlvOmH7fRRvX0FIfXX5DkpOP1FeId1gPjNG5ciaWWRgCItvCxB7A00W9FHlm2k"
);

const admin = require("firebase-admin");
const database = admin.firestore();

const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "myr",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("404,Not Found.");
});

exports.api = functions.https.onRequest(app);

exports.scheduledFunction = functions.pubsub
  .schedule("every 5 minutes")
  .onRun((context) => {
    database
      .collection("promotionCode")
      .get()
      .then((snapshot) => {
        const promotionCodeArray = snapshot.docs.map((doc) => {
          console.log(doc.data);
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(promotionCodeArray);
      })
      .catch((err) => {
        reject(err);
      });

    return console.log("This will be run every 5 minutes!");
  });

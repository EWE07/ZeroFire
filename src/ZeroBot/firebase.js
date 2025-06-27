// FireBase

const admin = require("firebase-admin");
const serviceAccount = require("../../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zerofire-8cf64-default-rtdb.europe-west1.firebasedatabase.app"
});


const db = admin.firestore();

module.exports = { db }

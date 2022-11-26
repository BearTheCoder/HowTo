/*
  The following script will connect to Firebase Firestore.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
const { getFirestore, doc, setDoc, getDoc, getDocs, collection } = require("firebase/firestore"); // npm i firebase
require('dotenv').config; // npm i dotenv

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_DOMAIN,
  projectId: process.env.PRO_ID,
  storageBucket: process.env.FB_BUCKET,
  messagingSenderId: process.env.FB_SENDER_ID,
  appId: process.env.FB_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const col = collection(db, "users");
const docRef = doc(db, "users", "TEST");

// If collection exists, it adds to the collection, if not, it creates the collection
// If DOC_NAME is not unique, then the information is updated.
//doc(*DB_REF*, *COLLECTION_NAME*, *DOC_NAME*)
setDoc(docRef, {
  first: "STEVE",
  last: "Lovelace",
  born: 1815
}).then((docRef) => {
  console.log("Document written with ID: ", docRef);
});

//Gets the document based on the doc ref
getDoc(docRef).then((querySnapshot) => {
  console.log(querySnapshot.data());
});

//Gets all documents in a collection
getDocs(col).then((docs) => {
  docs.forEach((d) => {
    console.log(d.id, d.data());
  });
});

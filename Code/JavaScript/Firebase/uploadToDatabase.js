/*
  The following script will connect to Firebase Firestore.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
const { getFirestore, doc, setDoc, getDoc, getDocs, collection } = require("firebase/firestore"); // npm i firebase
require('dotenv').config; // npm i dotenv

const firebaseConfig = {
  apiKey: "AIzaSyAtsvkP-si-K-2JhnWhfUU1GN4UTWJFcRc",
  authDomain: "btc-db-97c7e.firebaseapp.com",
  projectId: "btc-db-97c7e",
  storageBucket: "btc-db-97c7e.appspot.com",
  messagingSenderId: "964621763508",
  appId: "1:964621763508:web:148199c048b486828e28e1"
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

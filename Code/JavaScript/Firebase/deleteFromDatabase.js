/*
  The following script will connect to Firebase Firestore.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
const { getFirestore, doc, collection, deleteDoc } = require("firebase/firestore"); // npm i firebase

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
const docRef = doc(db, "Red", "Red Tile");

deleteDoc(docRef);

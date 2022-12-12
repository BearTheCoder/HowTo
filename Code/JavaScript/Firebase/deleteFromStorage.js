/*
  The following script will connect to a Firebase cloud storage,
  get a reference to and image using the url, then delete it.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
const { getStorage, ref, deleteObject } = require("firebase/storage"); // npm i firebase

// You can receive the following after you create your project and register your app.
//This is safe to have public
const firebaseConfig = {
 apiKey: "AIzaSyAtsvkP-si-K-2JhnWhfUU1GN4UTWJFcRc",
 authDomain: "btc-db-97c7e.firebaseapp.com",
 projectId: "btc-db-97c7e",
 storageBucket: "btc-db-97c7e.appspot.com",
 messagingSenderId: "964621763508",
 appId: "1:964621763508:web:148199c048b486828e28e1"
};

const firebaseStorageURL = "https://firebasestorage.googleapis.com/v0/b/btc-db-97c7e.appspot.com/o/screenshot%20(9)%20(1).png?alt=media&token=52fc1213-f88a-419c-a2b8-e36c844338a0";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const refFromURL = ref(storage, firebaseStorageURL);

deleteObject(refFromURL)



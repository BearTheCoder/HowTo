/*
  The following script will connect to a Firebase cloud storage,
  upload an image, and return an HTML useable URL.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
const { getStorage, ref, uploadBytes, getDownloadURL, } = require("firebase/storage"); // npm i firebase
const fs = require('fs');
require('dotenv').config; // npm i dotenv

// You can receive the following after you create your project and register your app.
const firebaseConfig = {
  apiKey: "AIzaSyAtsvkP-si-K-2JhnWhfUU1GN4UTWJFcRc",
  authDomain: "btc-db-97c7e.firebaseapp.com",
  projectId: "btc-db-97c7e",
  storageBucket: "btc-db-97c7e.appspot.com",
  messagingSenderId: "964621763508",
  appId: "1:964621763508:web:148199c048b486828e28e1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const mountainsRef = ref(storage, './Images/mountains.jpg');
const mountainsData = fs.readFileSync('./Images/mountains.jpg');

uploadBytes(mountainsRef, mountainsData)
  .then(() => {
    return getDownloadURL(mountainsRef);
  })
  .then((url) => {
    // SAVE URL LINK AND ASSOCIATED DATA TO DATABASE HERE
    console.log(url);
  })
  .catch((error) => {
    // Handle any errors
  });



/*
  The following script will connect to a Firebase cloud storage,
  upload an image, and return an HTML useable URL.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage"); // npm i firebase
const fs = require('fs');
require('dotenv').config; // npm i dotenv

// You can receive the following after you create your project and register your app.
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_DOMAIN,
  projectId: process.env.PRO_ID,
  storageBucket: process.env.FB_BUCKET,
  messagingSenderId: process.env.FB_SENDER_ID,
  appId: process.env.FB_APP_ID,
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



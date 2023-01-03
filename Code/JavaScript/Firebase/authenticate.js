/*
  The following script will connect to Firebase Firestore.
*/

const { initializeApp } = require("firebase/app"); // npm i firebase
var firebase = require('firebase');
var firebaseui = require('firebaseui');

const firebaseConfig = {
  apiKey: "AIzaSyAtsvkP-si-K-2JhnWhfUU1GN4UTWJFcRc",
  authDomain: "btc-db-97c7e.firebaseapp.com",
  projectId: "btc-db-97c7e",
  storageBucket: "btc-db-97c7e.appspot.com",
  messagingSenderId: "964621763508",
  appId: "1:964621763508:web:148199c048b486828e28e1"
};

const app = initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});


import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyA4BnzB1V6BM1fWpEDKTudlO6dthKx2XPI",
  authDomain: "crwn-db-2040c.firebaseapp.com",
  projectId: "crwn-db-2040c",
  storageBucket: "crwn-db-2040c.appspot.com",
  messagingSenderId: "493161454895",
  appId: "1:493161454895:web:4584186200fe2408d395da",
  measurementId: "G-V9THWKP1WJ",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

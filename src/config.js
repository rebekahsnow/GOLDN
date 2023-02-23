// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEs_EGGUGoCizs6YV3BwEHNkuGmMvUUfU",
  authDomain: "seniorproject-6f200.firebaseapp.com",
  projectId: "seniorproject-6f200",
  storageBucket: "seniorproject-6f200.appspot.com",
  messagingSenderId: "688453404666",
  appId: "1:688453404666:web:2e2f0b55741ffc5efe0643",
  measurementId: "G-DBC1FWTLGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
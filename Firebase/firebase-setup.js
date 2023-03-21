// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import React from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "@env";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'

// import { getAuth } from "firebase/auth";
// Initialize Firebase
const myApp = initializeApp(firebaseConfig);
// export const auth  = getAuth(myApp);

export const auth = initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const firestore = getFirestore(myApp);
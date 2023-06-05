// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optiona
/* const firebaseConfig = {
  apiKey: "AIzaSyA_Qib7HCHltBL2yelrLuubG1imXRD2t6I",
  authDomain: "atenserver.firebaseapp.com",
  projectId: "atenserver",
  storageBucket: "atenserver.appspot.com",
  messagingSenderId: "507296230589",
  appId: "1:507296230589:web:ec9182d3debf0fa2755bd4"
  }; */
  const firebaseConfig = {
    apiKey: "AIzaSyCTiQjhbqGVCMFK4JmpAzmpy-9DSWplRow",
    authDomain: "servidoraten.firebaseapp.com",
    projectId: "servidoraten",
    storageBucket: "servidoraten.appspot.com",
    messagingSenderId: "819947338876",
    appId: "1:819947338876:web:4be8adc7f982b575fe5df9",
    measurementId: "G-882D3VVR3S"
  };

// Initialize Firebase


export const Acceso = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const db = getFirestore();

export const storage = getStorage(Acceso);

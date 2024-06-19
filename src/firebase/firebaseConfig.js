import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import {getStorage} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRo5woCV6JxMPK3kTxt4h0c6kq3s7zpqA",
  authDomain: "karaoke-project-c05a2.firebaseapp.com",
  projectId: "karaoke-project-c05a2",
  storageBucket: "karaoke-project-c05a2.appspot.com",
  messagingSenderId: "849434176647",
  appId: "1:849434176647:web:e61bebfdc18225d3745c22"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage()
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

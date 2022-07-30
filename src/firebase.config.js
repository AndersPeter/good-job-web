import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzEIKpf8cykTyajSippIX3bZTpFnppBTA",
  authDomain: "good-job-web.firebaseapp.com",
  projectId: "good-job-web",
  storageBucket: "good-job-web.appspot.com",
  messagingSenderId: "194174089435",
  appId: "1:194174089435:web:68ee9b6c37d1c164f9f4fe"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
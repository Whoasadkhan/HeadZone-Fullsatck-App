
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxZNVvAMhod4JZd6L5yylV70N6QxhHzEM",
    authDomain: "ecommerceasadboat.firebaseapp.com",
    projectId: "ecommerceasadboat",
    storageBucket: "ecommerceasadboat.appspot.com",
    messagingSenderId: "387544285766",
    appId: "1:387544285766:web:c34a5644626cc9c8a4c047",
    measurementId: "G-483MVT0M93"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

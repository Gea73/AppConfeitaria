
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvprWH4kS_tNCoAtnUtiwhY5t33vUIT5M",
    authDomain: "appconfeitariagean.firebaseapp.com",
    projectId: "appconfeitariagean",
    storageBucket: "appconfeitariagean.firebasestorage.app",
    messagingSenderId: "175660946385",
    appId: "1:175660946385:web:5c2ed2fa7fb04a640c86f0",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
export { auth, db };


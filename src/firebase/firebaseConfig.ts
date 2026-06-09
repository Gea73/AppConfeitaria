
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_API_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_API_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_API_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_API_APP_ID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
export { auth, db };


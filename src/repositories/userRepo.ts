import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const userRepo = {
    createUser: async function (name: string, email: string) {
        try {
            const timeStamp = serverTimestamp()

            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                createdAt: timeStamp
            })

            return { id: docRef.id, createdAt: timeStamp }
        } catch (error) {
            throw error
        }
    },


    getUserById: async function (id: string) {
        try {
            const docRef = doc(db, "users", id)
            return await getDoc(docRef);
        } catch (error) {
            throw error
        }
    },


    getUserByEmail: async function (email: string) {
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            return querySnapshot;
        } catch (error) {
            throw error
        }
    }

}
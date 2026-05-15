import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

async function createUser(name: string, email: string) {
    try {

        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            createdAt: serverTimestamp()
        })

        return docRef.id
    } catch (error) {
        console.error(error);
    }
}


async function getUserById(id: string) {
    try {
       const docRef = doc(db,"users",id)
        return await getDoc(docRef);
    } catch (error) {
        console.error(error);
    }
}


async function getUserByEmail(email: string) {
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
}

import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const userRepo = {
    createUser: async function (uid: string, name: string, email: string) {
        try {
            const timeStamp = serverTimestamp()
            await setDoc(doc(db, "users", uid), {
                name: name,
                email: email,
                createdAt: timeStamp,
                role: "user"
            })

            return { createdAt: timeStamp }

        } catch (error) {
            throw error
        }
    },


    getUserById: async function (uid: string) {
        try {
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data()
                return { uid: uid, name: data.name, email: data.email, createdAt: data.createdAt, role: data.role }
            }
        } catch (error) {
            throw error
        }
    },


    getUserByEmail: async function (email: string) {
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                const result = querySnapshot.docs[0]
                const data = result.data()
                return { uid: result.id, name: data.name, email: data.email, createdAt: data.createdAt,role: data.role }
            }

        } catch (error) {
            throw error
        }
    }

}
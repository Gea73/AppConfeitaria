import { User } from "@/models/user";
import { UserRecord } from "@/types/userRecord";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const userRepo = {
    createUser: async function (user: User) {
        try {
            const timeStamp = serverTimestamp()
            await setDoc(doc(db, "users", user.getUid()), {
                name: user.getName(),
                email: user.getEmail(),
                createdAt: timeStamp,
                role: "user"
            })


        } catch (error) {
            throw error
        }
    },


    getUserById: async function (uid: string): Promise<UserRecord | null> {
        try {
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return null
            }
            const data = docSnap.data()
            if (!data) {
                return null
            }

            return { uid: docSnap.id, name: data.name, email: data.email, role: data.role, createdAt: data.createdAt }

        } catch (error) {
            throw error
        }
    },


    getUserByEmail: async function (email: string): Promise<UserRecord | null> {
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot || !querySnapshot.docs) {
                return null
            }
            const result = querySnapshot.docs[0]
            const data = result.data()

            if (!data) {
                return null
            }

            return { uid: result.id, name: data.name, email: data.email, role: data.role, createdAt: data.createdAt }


        } catch (error) {
            throw error
        }
    }

}
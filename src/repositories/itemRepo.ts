import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const itemRepo = {

    createItem: async function (name: string, description: string, price: number, imageUrl: string) {
        try {
            const timeStamp = serverTimestamp();

            const docRef = await addDoc(collection(db, "items"), {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
                createdAt: timeStamp
            })

            return { id: docRef.id, createdAt: timeStamp }

        } catch (error) {
            throw error
        }
    },

    getItemByName: async function (name: string) {
        try {
            const q = query(collection(db, "items"), where("name", "==", name));
            const querySnapshot = await getDocs(q);
            return querySnapshot;

        } catch (error) {
            throw error
        }
    },

    getItemById: async function (id: string) {
        try {
            const docRef = doc(db, "items", id)
            return await getDoc(docRef);

        } catch (error) {
            throw error
        }
    },


    updateItem: async function (id: string, description: string | null, price: number | null, imageUrl: string | null) {
        try {
            const docRef = doc(db, "items", id)
            let dataToUpdate = {}
            if (description != null) {
                dataToUpdate = { ...dataToUpdate, description: description }
            }
            if (price != null) {
                dataToUpdate = { ...dataToUpdate, price: price }
            }
            if (imageUrl != null) {
                dataToUpdate = { ...dataToUpdate, imageUrl: imageUrl }
            }
            await updateDoc(docRef,
                dataToUpdate
            )

        } catch (error) {
            throw error
        }


    },


    deleteItem: async function (id: string) {
        try {
            const docRef = doc(db, "items", id)
            await deleteDoc(docRef)
        } catch (error) {
            throw error
        }
    }

}
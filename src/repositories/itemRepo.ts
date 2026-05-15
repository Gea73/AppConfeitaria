import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

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


    updateItemDescription: async function (id: string, description: string) {
        try {
            const docRef = doc(db, "items", id)
            await updateDoc(docRef, {
                description: description
            })
        } catch (error) {
            throw error
        }
    },

    updateItemPrice: async function (id: string, price: number) {
        try {
            const docRef = doc(db, "items", id)
            await updateDoc(docRef, {
                price: price
            })
        } catch (error) {
            throw error
        }
    },

    updateItemImage: async function (id: string, imageUrl: string) {
        try {
            const docRef = doc(db, "items", id)
            await updateDoc(docRef, {
                imageUrl: imageUrl
            })
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
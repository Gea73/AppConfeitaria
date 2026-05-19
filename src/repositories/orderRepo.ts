import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

export const orderRepo = {
    createOrder: async function (customerId: string, items: object) {
        try {
            const timeStamp = serverTimestamp()

            const docRef = await addDoc(collection(db, "orders"), {
                customerId: customerId,
                items: items,
                status: "pending",
                createdAt: timeStamp
            })

            return { id: docRef.id, createdAt: timeStamp }
        } catch (error) {
            throw error
        }
    },


    updateOrder: async function (orderId: string, status: string | null, items: object | null) {
        try {
            const docRef = doc(db, "orders", orderId)
            let dataToUpdate = {}
            if (status != null) {
                dataToUpdate = { ...dataToUpdate, status: status }
            }
            if (items != null) {
                dataToUpdate = { ...dataToUpdate, items: status }
            }
            await updateDoc(docRef, dataToUpdate)
        } catch (error) {
            throw error
        }

    }

    ,
    getOrderById: async function (id: string) {
        try {
            const docRef = doc(db, "orders", id)
            return await getDoc(docRef);
        } catch (error) {
            throw error
        }
    },

    getOrdersByCustomer: async function (customerId: string) {
        try {
            const q = query(collection(db, "orders"), where("customerId", "==", customerId));
            const querySnapshot = await getDocs(q);
            return querySnapshot;
        } catch (error) {
            throw error
        }
    },

    deleteOrder: async function (id: string) {
        try {
            const docRef = doc(db, "orders", id)
            await deleteDoc(docRef)
        } catch (error) {
            throw error
        }
    }
}
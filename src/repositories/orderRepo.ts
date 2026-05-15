import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

export const orderRepo = {
    createOrder: async function (customerId: string, items: object, status: string) {
        try {
            const timeStamp = serverTimestamp()

            const docRef = await addDoc(collection(db, "orders"), {
                customerId: customerId,
                items: items,
                status: status,
                createdAt: timeStamp
            })

            return { id: docRef.id, createdAt: timeStamp }
        } catch (error) {
            throw error
        }
    },

    updateOrderStatus: async function (orderId: string, status: string) {
        try {
            const docRef = doc(db, "orders", orderId)
            await updateDoc(docRef, {
                status: status
            })
        } catch (error) {
            throw error
        }
    },

    updateOrderItems: async function (orderId: string, items: object) {
        try {
            const docRef = doc(db, "orders", orderId)
            await updateDoc(docRef, {
                items: items
            })
        } catch (error) {
            throw error
        }
    },

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
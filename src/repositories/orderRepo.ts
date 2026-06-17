import { Order } from "@/models/order";
import { OrderItem } from "@/types/orderItem";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const orderRepo = {
    createOrder: async function (order:Order) {
        try {
            
            const timeStamp = serverTimestamp()
            
            const docRef = await addDoc(collection(db, "orders"), {
                customerId: order.getCustomerUid(),
                items: order.getItems(),
                status: order.getStatus(),
                createdAt: timeStamp,
                total:order.getTotal()
            })
           
            return { uid: docRef.id, createdAt: timeStamp }
        } catch (error) {
            throw error
        }
    },


    updateOrder: async function (orderId: string, status: string | null, items: OrderItem[] | null) {
        try {
            const docRef = doc(db, "orders", orderId)
            let dataToUpdate = {}
            if (status != null) {
                dataToUpdate = { ...dataToUpdate, status: status }
            }
            if (items != null) {
                dataToUpdate = { ...dataToUpdate, items: items }
            }
            await updateDoc(docRef, dataToUpdate)
        } catch (error) {
            throw error
        }

    }

    ,
    getOrderById: async function (uid: string) {
        try {
            const docRef = doc(db, "orders", uid)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data()
                return { uid: uid, customerId: data.customerId, items: data.items, status: data.status, createdAt: data.createdAt }
            }
        } catch (error) {
            throw error
        }
    },

    getOrdersByCustomer: async function (customerId: string) {
        try {
            const q = query(collection(db, "orders"), where("customerId", "==", customerId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                const orders = querySnapshot.docs.map((result) => {
                    const data = result.data()
                    return { uid: result.id, customerId: data.customerId, items: data.items, status: data.status, createdAt: data.createdAt }
                })
                return orders
            }
            return null;
        } catch (error) {
            throw error
        }
    },


    getOrders: async function () {
        try {
            const q = query(collection(db, "orders"))
            const querySnapshot = await getDocs(q)
            if (querySnapshot) {
                const orders = querySnapshot.docs.map((result) => {
                    const data = result.data()
                    return { uid: result.id, customerId: data.customerId, items: data.items, status: data.status, createdAt: data.createdAt }
                })
                return orders
            }
        } catch (error) {
            throw error
        }
    },

    deleteOrder: async function (uid: string) {
        try {
            const docRef = doc(db, "orders", uid)
            await deleteDoc(docRef)
        } catch (error) {
            throw error
        }
    }
}
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

async function createOrder(customerId: string, items: object, status: string) {
    try {

        const docRef = await addDoc(collection(db, "orders"), {
            customerId: customerId,
            items: items,
            status: status,
            createdAt: serverTimestamp()
        })

        return docRef.id
    } catch (error) {
         throw error
    }
}

async function updateOrderStatus(orderId: string, status: string) {
    try {
        const docRef = doc(db, "orders", orderId)
        await updateDoc(docRef, {
            status: status
        })
    } catch (error) {
         throw error
    }
}

async function updateOrderItems(orderId: string, items: object) {
    try {
        const docRef = doc(db, "orders", orderId)
        await updateDoc(docRef, {
            items: items
        })
    } catch (error) {
         throw error
    }
}

async function getOrderById(id: string) {
    try {
        const docRef = doc(db, "orders", id)
        return await getDoc(docRef);
    } catch (error) {
         throw error
    }
}

async function getOrdersByCustomer(customerId: string) {
    try {
        const q = query(collection(db, "orders"), where("customerId", "==", customerId));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
         throw error
    }
}

async function deleteOrder(id: string) {
    try {
        const docRef = doc(db, "orders", id)
        await deleteDoc(docRef)
    } catch (error) {
        throw error
    }
}

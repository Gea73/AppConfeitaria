import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import db from "../firebase/firebaseConfig";


async function createItem(name: string, description: string, price: number, imageUrl: string) {
    try {

        const docRef = await addDoc(collection(db, "items"), {
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
            createdAt: serverTimestamp()
        })
        return docRef.id
    } catch (error) {
        console.error(error);
    }
}

async function getItemByName(name: string) {
    try {
        const q = query(collection(db, "items"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
}

async function getItemById(id: string) {
    try {
        const docRef = doc(db, "items", id)
        return await getDoc(docRef);
    } catch (error) {
        console.error(error);
    }
}


async function updateItemDescription(id: string, description: string) {
    try {
        const docRef = doc(db, "items", id)
        await updateDoc(docRef, {
            description: description
        })
    } catch (error) {
        console.error(error);
    }
}

async function updateItemPrice(id: string, price: number) {
    try {
        const docRef = doc(db, "items", id)
        await updateDoc(docRef, {
            price: price
        })
    } catch (error) {
        console.error(error);
    }
}
async function updateItemImage(id: string, imageUrl: string) {
    try {
        const docRef = doc(db, "items", id)
        await updateDoc(docRef, {
            imageUrl: imageUrl
        })
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(id: string) {
    try {
        const docRef = doc(db, "items", id)
        await deleteDoc(docRef)
    } catch (error) {
        console.error(error);
    }
}
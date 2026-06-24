import { Item } from "@/models/item";
import { ItemRecord } from "@/types/itemRecord";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const itemRepo = {

    createItem: async function (item: Item): Promise<void> {
        try {
            const timeStamp = serverTimestamp();

            await addDoc(collection(db, "items"), {
                name: item.getName(),
                description: item.getDescription(),
                price: item.getPrice(),
                imageUrl: item.getImageUrl(),
                createdAt: timeStamp
            })


        } catch (error) {
            throw error
        }
    },

    getItemByName: async function (name: string): Promise<ItemRecord | null> {
        try {
            const q = query(collection(db, "items"), where("name", "==", name));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot || !querySnapshot.docs) {
                return null
            }
            const result = querySnapshot.docs[0]
            const data = result.data()

            return {
                uid: result.id,
                name: data.name,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
                createdAt: data.createdAt
            }
        } catch (error) {
            throw error
        }
    },

    getItemById: async function (uid: string): Promise<ItemRecord | null> {
        try {
            const docRef = doc(db, "items", uid)
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                return null
            }

            const data = docSnap.data()
            return { uid: docSnap.id, name: data.name, description: data.description, price: data.price, imageUrl: data.imageUrl, createdAt: data.createdAt }

        } catch (error) {
            throw error
        }
    },

    getItems: async function (): Promise<ItemRecord[] | null> {
        try {
            const q = query(collection(db, "items"))
            const querySnapshot = await getDocs(q)
            if (!querySnapshot || !querySnapshot.docs) {
                return null
            }

            const items = querySnapshot.docs.map((result) => {
                const data = result.data()
                return { uid: result.id, name: data.name, description: data.description, price: data.price, imageUrl: data.imageUrl, createdAt: data.createdAt }
            })

            return items

        } catch (error) {
            throw error
        }
    },
    updateItem: async function (uid: string, name: string | null, description: string | null, price: number | null, imageUrl: string | null): Promise<void> {
        try {
            const docRef = doc(db, "items", uid)
            let dataToUpdate = {}
            if (name != null) {
                dataToUpdate = { ...dataToUpdate, name: name }
            }
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


    deleteItem: async function (uid: string): Promise<void> {
        try {

            const docRef = doc(db, "items", uid)
            await deleteDoc(docRef)

        } catch (error) {
            throw error
        }
    }

}
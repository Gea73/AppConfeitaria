import { db } from "@/firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Item } from "../models/item";
import { itemRepo } from "../repositories/itemRepo";

export const itemService = {
    createItem: async function (name: string, description: string, price: number, imageUrl: string) {
        try {


            const item = new Item(name, description, price, imageUrl);
            const data = await itemRepo.createItem(item);
            item.setUid(data.uid)
            item.setCreatedAt(data.createdAt)

            return item;

        } catch (error) {
            throw new Error("Item can't be created", {
                cause: error
            })
        }


    },

    updateItem: async function (uid: string, name: string | null, description: string | null, price: number | null, imageUrl: string | null) {
        try {

            await itemRepo.updateItem(uid, name, description, price, imageUrl)


        } catch (error) {
            throw new Error("Item can't be updated", {
                cause: error
            })
        }

    },

    getItem: async function (uid: string) {
        if (uid) {
            const data = await itemRepo.getItemById(uid);
            const item = new Item(data?.name, data?.description, data?.price, data?.imageUrl, uid, data?.createdAt)
            return item

        }


    },

    getItems: async function () {
        const data = await itemRepo.getItems();
        const items = data?.map((i) => { return new Item(i.name, i.description, i.price, i.imageUrl, i.uid, i.createdAt) })
        if (items) {
            return items
        }
        return []

    },

    deleteItem: async function (uid: string) {
        await itemRepo.deleteItem(uid);
    },
    subscribeToItems: function (callback: (items: Item[]) => void) {
        return onSnapshot(collection(db, "items"), (snapshot) => {
            const items = snapshot.docs.map((doc) => {
                const data = doc.data()
                return new Item(data.name, data.description, data.price, data.imageUrl, doc.id, data.createdAt)
            })
            callback(items)
        })

    }
}
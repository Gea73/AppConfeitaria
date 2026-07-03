
import { v7 as uuidv7 } from "uuid";
import { Item } from "../models/item.js";
import { itemRepo } from "../repositories/itemRepo.js";


export const itemService = {
    createItem: async function (name: string, description: string, price: number, imageUrl: string): Promise<void> {
        try {

            const id = uuidv7();

            const item = new Item(id, name, description, price, imageUrl);

            await itemRepo.createItem(item);


        } catch (error) {
            throw new Error("Item can't be created", {
                cause: error
            })
        }


    },

    updateItem: async function (id: string, name: string | null, description: string | null, price: number | null, imageUrl: string | null): Promise<void> {
        try {

            await itemRepo.updateItem(id, name, description, price, imageUrl)

        } catch (error) {
            throw new Error("Item can't be updated", {
                cause: error
            })
        }

    },

    getItem: async function (id: string) {
        try {

            const data = await itemRepo.getItemById(id);
            if (!data) {
                return null
            }

            return { id: data?.id, name: data?.name, description: data?.description, price: data?.price, imageUrl: data?.imageUrl }


        } catch (error) {
            throw new Error("Item can't be fetched", {
                cause: error
            })
        }

    },

    getItems: async function () {
        try {
            const data = await itemRepo.getItems();
            if (!data) {
                return null
            }

            const items = data?.map((i) => { return { id: i.id, name: i.name, description: i.description, price: i.price, imageUrl: i.imageUrl } })
            return items

        } catch (error) {
            throw new Error("Item can't be fetched", {
                cause: error
            })
        }
    },

    deleteItem: async function (id: string): Promise<void> {
        try {

            await itemRepo.deleteItem(id);

        } catch (error) {
            throw new Error("Item can't be deleted", {
                cause: error
            })
        }

    },
    /*
    subscribeToItems: function (callback: (items: Item[]) => void) {
        try {


            return onSnapshot(collection(db, "items"), (snapshot) => {
                const items = snapshot.docs.map((doc) => {
                    const data = doc.data()
                    return new Item(data.name, data.description, data.price, data.imageUrl, doc.id)
                })
                callback(items)
            })
        } catch (error) {
            throw new Error("It was not possible to subscribe to items", {
                cause: error
            })
        }
    }*/
}
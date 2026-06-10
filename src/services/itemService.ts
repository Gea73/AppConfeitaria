import { Item } from "../models/item";
import { itemRepo } from "../repositories/itemRepo";

export const itemService = {
    createItem: async function (name: string, description: string, price: number, imageUrl: string) {
        try {
            const data = await itemRepo.createItem(name, description, price, imageUrl);

            const item = new Item(data.id, name, description, price, imageUrl, data.createdAt,);
            return item;

        } catch (error) {
            throw new Error("Item can't be created", {
                cause: error
            })
        }


    },

    updateItem: async function (uid: string,name:string | null, description: string | null, price: number | null, imageUrl: string | null) {
        try {

            await itemRepo.updateItem(uid,name, description, price, imageUrl)


        } catch (error) {
            throw new Error("Item can't be updated", {
                cause: error
            })
        }

    },

    getItem: async function (uid: string) {
        if (uid) {
            const data = await itemRepo.getItemById(uid);
            const item = new Item(uid, data?.name, data?.description, data?.price, data?.imageUrl, data?.createdAt)
            return item

        }


    },

    getItems: async function () {
        const data = await itemRepo.getItems();
        const items = data?.map((i) => { return new Item(i.uid, i.name, i.description, i.price, i.imageUrl, i.createdAt) })
        if (items) {
            return items
        }
        return []

    },

    deleteItem: async function (id: string) {
        await itemRepo.deleteItem(id);
    }

}
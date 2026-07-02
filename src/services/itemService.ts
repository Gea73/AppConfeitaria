
import { Item } from "../models/item";
const API_URL = process.env.API_URL

export const itemService = {
    createItem: async function (name: string, description: string, price: number, imageUrl: string): Promise<void> {
        try {


            const response = await fetch(`${API_URL}/item/}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, description: description, price: price, imageUrl: imageUrl })
            })

            if (!response.ok) {
                throw new Error("Item couldn't be created")
            }


        } catch (error) {
            throw new Error("Item can't be created", {
                cause: error
            })
        }


    },

    updateItem: async function (id: string, name: string | null, description: string | null, price: number | null, imageUrl: string | null): Promise<void> {
        try {

            const response = await fetch(`${API_URL}/item/${id}}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, description: description, price: price, imageUrl: imageUrl })
            })

            if (!response.ok) {
                throw new Error("Order couldn't be updated")
            }


        } catch (error) {
            throw new Error("Item can't be updated", {
                cause: error
            })
        }

    },

    getItem: async function (id: string): Promise<Item | null> {
        try {

            const response = await fetch(`${API_URL}/item/${id}}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("Item couldn't be fetched")
            }
            const data = await response.json()
            if (!data) {
                return null
            }

            return new Item(data?.name, data?.description, data?.price, data?.imageUrl, data.id)


        } catch (error) {
            throw new Error("Item can't be fetched", {
                cause: error
            })
        }

    },

    getItems: async function (): Promise<Item[] | null> {
        try {
            const response = await fetch(`${API_URL}/item/}}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("Item couldn't be fetched")
            }
            const data = await response.json()
            if (!data) {
                return null
            }

            const items = data?.map((i: Item) => { return new Item(i.getName(), i.getDescription(), i.getPrice(), i.getImageUrl(), i.getId()) })
            return items

        } catch (error) {
            throw new Error("Item can't be fetched", {
                cause: error
            })
        }
    },

    deleteItem: async function (id: string): Promise<void> {
        try {

            const response = await fetch(`${API_URL}/item/${id}}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("Item couldn't be deleted")
            }

        } catch (error) {
            throw new Error("Item can't be deleted", {
                cause: error
            })
        }

    },

}

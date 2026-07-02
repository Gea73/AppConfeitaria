import { Request, Response } from "express";
import { itemService } from "../services/itemService.js";

export const controller = {

    createItem: async function (req: Request, res: Response) {
        try {
            let { name, description, price, imageUrl } = req.body;

            name = String(name).trim()
            price = Number(price)
            description = String(description).trim()
            imageUrl = String(imageUrl).trim()

            if (!name || !description || !price || !imageUrl) {
                return res.status(400).json({ message: "FAILURE" })
            }

            await itemService.createItem(name, description, price, imageUrl)

            return res.status(201).json({ message: "SUCCESS" })

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },

    getItem: async function (req: Request, res: Response) {
        try {
            const id = req.params.id.toString()

            const result = await itemService.getItem(id)

            return res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },
    getItems: async function (req: Request, res: Response) {
        try {


            const result = await itemService.getItems()

            return res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },
    updateItem: async function (req: Request, res: Response) {
        try {

            const id = req.params.id.toString()

            let { name, description, price, imageUrl } = req.body;

            name = String(name).trim()
            price = Number(price)
            description = String(description).trim()
            imageUrl = String(imageUrl).trim()

            if (!name || !description || !price || !imageUrl) {
                return res.status(400).json({ message: "FAILURE" })
            }

            await itemService.updateItem(id, name, description, price, imageUrl)

            return res.status(200).json({ message: "SUCCESS" })

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },
    deleteItem: async function (req: Request, res: Response) {
        try {
            const id = req.params.id.toString()

            await itemService.deleteItem(id)

            return res.status(200).json({ message: "SUCCESS" })
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }

    }

}
import { Request, Response } from "express";
import { orderService } from "../services/orderService.js";


export const controller = {

    createOrder: async function (req: Request, res: Response) {
        try {
            const { customerId, items, status } = req.body;

            await orderService.createOrder(customerId, items, status)

            return res.status(201).json({ message: "SUCCESS" })

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },

    getOrder: async function (req: Request, res: Response) {
        try {

            const id = req.params.id.toString()

            const result = await orderService.getOrder(id)

            return res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },
    getOrders: async function (req: Request, res: Response) {
        try {

            const customerId = req.params.customerId.toString()

            const result = await orderService.getOrders(customerId)

            return res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },
    getAllOrders: async function (req: Request, res: Response) {
           console.log("GET /order/all reached");
        try {

            const result = await orderService.getAllOrders()

            return res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }

    },
    updateOrder: async function (req: Request, res: Response) {
        try {

            const id = req.params.id.toString()

            const { items, status } = req.body

            await orderService.updateOrder(id, items, status)

            return res.status(200).json({ message: "SUCCESS" })
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    },
    deleteOrder: async function (req: Request, res: Response) {
        try {

            const id = req.params.id.toString()

            await orderService.deleteOrder(id)

            return res.status(200).json({ message: "SUCCESS" })

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }


    }

}
import { Request, Response } from "express";
import { userService } from "../services/userService.js";

export const controller = {

    createUser: async function (req: Request, res: Response) {
        try {
            let { name, email, password } = req.body;

            name = String(name).trim()
            email = String(email).trim().toLowerCase()
            password = String(password).trim()

            if (!name || !email || !password) {
                return res.status(400).json({ message: "FAILURE" })
            }

            await userService.createUser(name, email, password)

            return res.status(201).json({ message: "SUCCESS" })

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }

    },

    getUser: async function (req: Request, res: Response) {
        try {
            const id = req.params.id.toString().trim()
            const result = await userService.getUser(id)

            return res.status(200).json(result)

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    }


}
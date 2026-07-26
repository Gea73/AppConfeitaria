import { Request, Response } from "express";
import { authService } from "../services/authService.js";

export const controller = {

    signIn: async function (req: Request, res: Response) {
        try {
            let { email, password } = req.body;


            email = String(email).trim().toLowerCase()
            password = String(password).trim()

            if (!email || !password) {
                return res.status(401).json({ message: "FAILURE" })
            }

            const { user, accessToken } = await authService.signIn(email, password)

            return res.status(200).json({ user: { id: user.id, role: user.role }, token: accessToken })

        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }

    },
    getUser: async function (req: Request, res: Response) {
        try {
            const authHeader = req.headers["authorization"]
            const token = authHeader && authHeader.split(" ")[1]

            if (!token) {
                return res.status(401).json({ message: "Invalid Token" });
            }

            const { userId, role } = await authService.getUser(token)

            return res.status(200).json({ user: { id: userId, role: role }, token: token })
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
            throw error
        }
    }




}
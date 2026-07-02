
import { User } from "../models/user";
const API_URL = process.env.API_URL

export const userService = {
    createUser: async function (name: string, email: string, password: string,): Promise<void> {
        try {

            const response = await fetch(`${API_URL}/user/}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name, email: email, password: password })
            })

            if (!response.ok) {
                throw new Error("User couldn't be created")
            }


        } catch (error) {
            throw new Error("User couldn't be created", {
                cause: error
            })
        }
    },

    getUser: async function (id: string): Promise<User | null> {
        try {

            const response = await fetch(`${API_URL}/user/${id}}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("User couldn't be fetched")
            }

            const data = await response.json()

            if (!data) {
                return null
            }

            return new User(data.id, data.name, data.email, data.role)
        } catch (error) {
            throw new Error("User couldn't be fetched", {
                cause: error
            })
        }

    },




}

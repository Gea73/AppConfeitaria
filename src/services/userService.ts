import { User } from "../models/user";
import { userRepo } from "../repositories/userRepo";

export const userService = {
    createUser: async function name(uid: string, name: string, email: string) {
        try {

            const data = await userRepo.createUser(uid, name, email)

            const user = new User(data.uid, name, email, data.createdAt)
            return user

        } catch (error) {

            throw new Error("User couldn't be created", {
                cause: error
            })
        }
    },

    getUser: async function name(id: string | null, email: string | null) {
        if (id) {
            return await userRepo.getUserById(id)
        }
        if (email) {
            return await userRepo.getUserByEmail(email)
        }

    },




}

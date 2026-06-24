import { User } from "../models/user";
import { userRepo } from "../repositories/userRepo";

export const userService = {
    createUser: async function (uid: string, name: string, email: string): Promise<void> {
        try {

            const user = new User(uid, name, email, "user")
            await userRepo.createUser(user)

        } catch (error) {
            throw new Error("User couldn't be created", {
                cause: error
            })
        }
    },

    getUser: async function (uid: string): Promise<User | null> {
        try {


            const data = await userRepo.getUserById(uid)

            if (!data) {
                return null
            }

            return new User(data.uid,data.name,data.email,data.role)
        } catch (error) {
            throw new Error("User couldn't be fetched", {
                cause: error
            })
        }

    },




}

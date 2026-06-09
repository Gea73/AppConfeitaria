import { User } from "../models/user";
import { userRepo } from "../repositories/userRepo";

export const userService = {
    createUser: async function (uid: string, name: string, email: string) {
        try {

            const data = await userRepo.createUser(uid, name, email)

            const user = new User(uid, name, email, data.createdAt, "user")
            return user

        } catch (error) {

            throw new Error("User couldn't be created", {
                cause: error
            })
        }
    },

    getUser: async function (uid: string | null, email: string | null): Promise<User | null> {
        let data = null;
        if (uid) {
            data = await userRepo.getUserById(uid)
        }
        if (email) {
            data = await userRepo.getUserByEmail(email)
        }

        if (data) {
            const user = new User(data?.uid, data?.name, data?.email, data?.createdAt, data?.role)
            return user
        }
        return null

    },




}

import { User } from "../models/user.js";
import { userRepo } from "../repositories/userRepo.js";
import { v7 as uuidv7 } from "uuid";
import argon2id from "argon2"

export const userService = {
    createUser: async function (name: string, email: string, password: string): Promise<void> {
        try {
            const id = uuidv7();
            const password_hash = await argon2id.hash(password, {
                type: argon2id.argon2id,
                memoryCost: 32 * 1024,
                timeCost: 2,
                parallelism: 1,
            });

            const user = new User(id, name, email, "user")

            await userRepo.createUser(user, password_hash)

        } catch (error) {
            throw new Error("User couldn't be created", {
                cause: error
            })
        }
    },

    getUser: async function (uid: string): Promise<User | null> {
        try {


            const result = await userRepo.getUserById(uid)

            if (!result) {
                return null
            }

            return new User(result.uid, result.name, result.email, result.role)
        } catch (error) {
            throw new Error("User couldn't be fetched", {
                cause: error
            })
        }

    },
    getUserByEmail: async function (email: string) {
        try {


            const result = await userRepo.getUserByEmail(email)

            if (!result) {
                return null
            }

            return new User(result.uid, result.name, result.email, result.role)
        } catch (error) {
            throw new Error("User couldn't be fetched", {
                cause: error
            })
        }
    },





}

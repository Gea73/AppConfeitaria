
import argon2id from "argon2"
import jwt, { JwtPayload } from "jsonwebtoken"
import { userRepo } from "../repositories/userRepo.js"
import { generateAccessToken } from "../utils/accessToken.js"
import { userService } from "./userService.js"

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT Secret not founded");
}


export const authService = {

    signIn: async function (email: string, password: string) {
        try {
            const user = await userService.getUserByEmail(email)

            if (!user) {
                throw new Error("Invalid credentials email")
            }

            const password_hash = await userRepo.getUserPassword(user.id)
            const isValid = await argon2id.verify(password_hash, password)

            if (!isValid) {
                throw new Error("Invalid credentials password")
            }

            const accessToken = generateAccessToken(user.id,user.role)

            return { user, accessToken }

        } catch (error) {
            throw new Error("SignIn failed", {
                cause: error
            })
        }
    },
    getUser: async function (token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload


            return { userId: decoded.id, role: decoded.role }

        } catch (error) {
            throw new Error("User couldn't be found", {
                cause: error
            })

        }

    }
}
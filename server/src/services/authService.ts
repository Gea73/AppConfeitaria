import { userService } from "./userService.js"


export const authService = {

    signIn: async function (email: string, password: string) {
        try {
            const user = await userService.getUserByEmail(email)
            if (!user) {
                throw new Error("User not found")
            }
            const password_hash = await userService.getPasswordHash(user.getUid())

        } catch (error) {
            throw new Error("User couldn't be found", {
                cause: error
            })
        }
    }

}
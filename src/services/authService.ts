import * as SecureStore from "expo-secure-store"

export const authService = {

    getToken: async function () {
        return SecureStore.getItemAsync("authToken")
    },
    setToken: async function (token: string) {
        return SecureStore.setItemAsync("authToken", token)
    },
    clearToken: async function () {
        return SecureStore.deleteItemAsync("authToken")
    },
    getCurrentUser: async function () {
        const token = await this.getToken()
        if (!token) {
            return null
        }

        const response = await fetch("", {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.ok) {
            await this.clearToken()
            return null
        }

        return response.json()

    },
    signIn: async function (email: string, password: string) {
        const response = await fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })


        if (!response.ok) {
            throw new Error("Invalid credentials")
        }

        const { user, token } = await response.json()
        await this.setToken(token)
        return user
    },
    signOut: async function () {
        await this.clearToken();
    },



}
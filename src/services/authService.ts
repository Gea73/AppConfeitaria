import * as SecureStore from "expo-secure-store"
const API_URL = process.env.EXPO_PUBLIC_API_URL

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

        const response = await fetch(`${API_URL}/auth/`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.ok) {
            await this.clearToken()
            return null
        }

        const data = await response.json()
        const user = data.user

        return user

    },
    signIn: async function (email: string, password: string) {
        try {


            const response = await fetch(`${API_URL}/auth/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })


            if (!response.ok) {
                throw new Error("Invalid credentials Front")
            }

            const { user, token } = await response.json()
            await this.setToken(token)
            return user
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    signOut: async function () {
        await this.clearToken();
    },



}
export const authService = {



    signIn: async function (email: string, password: string) {
        const response = await fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })


        if (!response.ok) {
            throw new Error("Invalid credentials")
        }

        const { token, user } = await response.json()

        return user
    }




}
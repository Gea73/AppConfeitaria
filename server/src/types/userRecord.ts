


export type UserRecord = {
    id: string
    name: string
    email: string
    role: "user" | "admin"
    createdAt: Date
}
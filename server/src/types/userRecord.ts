


export type UserRecord = {
    uid: string
    name: string
    email: string
    role: "user" | "admin"
    createdAt: Date
}
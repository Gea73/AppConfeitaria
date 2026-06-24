import { FieldValue, Timestamp } from "firebase/firestore"


export type UserRecord = {
    uid: string
    name: string
    email: string
    role: "user" | "admin"
    createdAt: FieldValue | Timestamp
}
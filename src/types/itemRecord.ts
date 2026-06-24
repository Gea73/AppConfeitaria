import { FieldValue, Timestamp } from "firebase/firestore"
export type ItemRecord = {
    uid: string
    name: string
    description: string
    price: number
    imageUrl: string
    createdAt: FieldValue | Timestamp

}
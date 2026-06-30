import { OrderItem } from "./orderItem.js"
import { OrderStatus } from "./orderStatus.js"

export type OrderRecord = {
    uid: string
    customerUid: string
    items: OrderItem[]
    status: OrderStatus
    total: number,
    createdAt: Date
}


import { OrderItem } from "./orderItem"
import { OrderStatus } from "./orderStatus"

export type OrderRecord = {
    uid: string
    customerUid: string
    items: OrderItem[]
    status: OrderStatus
    total: number,
    createdAt: Date
}


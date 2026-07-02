import { OrderItem } from "./orderItem.js"
import { OrderStatus } from "./orderStatus.js"

export type OrderRecord = {
    id: string
    customerId: string
    items: OrderItem[]
    status: OrderStatus
    total: number,
    createdAt: Date
}


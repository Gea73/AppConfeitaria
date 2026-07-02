import { OrderItem } from "./orderItem"
import { OrderStatus } from "./orderStatus"

export type OrderRecord = {
    id: string
    customerId: string
    items: OrderItem[]
    status: OrderStatus
    total: number,
    createdAt: Date
}


import { OrderItem } from "@/types/orderItem";
import { OrderStatus } from "@/types/orderStatus";





export class Order {
    private _id: string
    private _customerId: string
    private _items: OrderItem[]
    private _status: OrderStatus
    private _total: number

    constructor(customerId: string, items: OrderItem[], status: OrderStatus, id: string) {
        this._id = this.setId(id)
        this._customerId = this.setCustomerId(customerId)
        this._items = this.setItems(items)
        this._status = this.setStatus(status)
        this._total = this.setTotal()

    }

    setId(id: string ) {
       
        if (id && id.trim().length === 0) {
            throw new Error("id is empty")
        }
        return id
    }

    getId(): string {
        return this._id
    }


    setCustomerId(customerId: string) {
        if (!customerId || customerId.trim().length === 0) {
            throw new Error("Customer id is empty")
        }
        return customerId
    }
    getCustomerId(): string {
        return this._customerId
    }

    setItems(items: OrderItem[]) {
        if (!items) {
            throw new Error("Items are null")
        }

        return items
    }
    getItems(): OrderItem[] {
        return this._items
    }

    setStatus(status: OrderStatus) {
        if (!status || status.trim().length === 0) {
            throw new Error("Status is empty")
        }

        return status
    }
    getStatus(): OrderStatus {
        return this._status
    }

    getStatusLabel(): string {
        const status: Record<OrderStatus, string> = {
            pending: "Aguardando confirmação",
            preparing: "Em Preparação",
            delivered: "Entregue"
        }
        return status[this._status]
    }

    setTotal() {
        if (this._total) {
            return this._total;
        }
        return this._items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    }




    getTotal(): number {
        return this._total
    }

}
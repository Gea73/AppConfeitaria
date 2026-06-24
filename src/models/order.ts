import { OrderItem } from "@/types/orderItem";
import { OrderStatus } from "@/types/orderStatus";





export class Order {
    private _uid: string | null
    private _customerUid: string
    private _items: OrderItem[]
    private _status: OrderStatus
    private _total: number

    constructor(customerUid: string, items: OrderItem[], status: OrderStatus, uid?: string) {
        this._uid = this.setUid(uid)
        this._customerUid = this.setCustomerUid(customerUid)
        this._items = this.setItems(items)
        this._status = this.setStatus(status)
        this._total = this.setTotal()

    }

    setUid(uid: string | undefined) {
        if (!uid) {
            return null
        }
        if (uid && uid.trim().length === 0) {
            throw new Error("uid is empty")
        }
        return uid
    }

    getUid(): string | null {
        return this._uid
    }


    setCustomerUid(customerId: string) {
        if (!customerId || customerId.trim().length === 0) {
            throw new Error("Customer uid is empty")
        }
        return customerId
    }
    getCustomerUid(): string {
        return this._customerUid
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
    getStatus(): string {
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
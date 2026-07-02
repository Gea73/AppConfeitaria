import { OrderItem } from "../types/orderItem.js";
import { OrderStatus } from "../types/orderStatus.js";





export class Order {
    private _uid: string
    private _customerUid: string
    private _items: OrderItem[]
    private _status: OrderStatus
    private _total: number

    constructor(uid: string, customerUid: string, items: OrderItem[], status: OrderStatus, total: number) {
        this._uid = this.setUid(uid)
        this._customerUid = this.setCustomerUid(customerUid)
        this._items = this.setItems(items)
        this._status = this.setStatus(status)
        this._total = this.setTotal(total)

    }

    setUid(uid: string) {
        if (!uid || uid.trim().length === 0) {
            throw new Error("UId is empty")
        }
        return uid
    }

    getUid(): string {
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

    setTotal(total: number) {
        if (!total || total <= 0) {
            throw new Error("Total is invalid")
        }

        return total
    }




    getTotal(): number {
        return this._total
    }

}
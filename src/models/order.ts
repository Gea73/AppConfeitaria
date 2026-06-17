import { OrderItem } from "@/types/orderItem";
import { orderStatus } from "@/types/orderStatus";
import { FieldValue, Timestamp } from "firebase/firestore";





export class Order {
    private _uid: string | null
    private _customerUid: string
    private _items: OrderItem[]
    private _status: orderStatus
    private _total: number
    private _createdAt: Timestamp | FieldValue | null
    constructor(customerUid: string, items: OrderItem[], status: orderStatus, uid?: string, createdAt?: Timestamp | FieldValue) {
        this._uid = this.setUid(uid)
        this._customerUid = this.setCustomerUid(customerUid)
        this._items = this.setItems(items)
        this._status = this.setStatus(status)
        this._total = this.setTotal()
        this._createdAt = this.setCreatedAt(createdAt)
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

    getUid() {
        return this._uid
    }


    setCustomerUid(customerId: string) {
        if (!customerId || customerId.trim().length === 0) {
            throw new Error("Customer uid is empty")
        }
        return customerId
    }
    getCustomerUid() {
        return this._customerUid
    }

    setItems(items: OrderItem[]) {
        if (!items) {
            throw new Error("Items are null")
        }

        return items
    }
    getItems() {
        return this._items
    }

    setStatus(status: orderStatus) {
        if (!status || status.trim().length === 0) {
            throw new Error("Status is empty")
        }

        return status
    }
    getStatus() {
        if (this._status === "pending") {
            return "Aguardando confirmação"
        }

        if (this._status === "preparing") {
            return "Em Preparação"
        }


        if (this._status === "delivered") {
            return "Entregue"
        }
        return this._status
    }


    setCreatedAt(createdAt: Timestamp | FieldValue | undefined) {
        if (!createdAt) {
            return null
        }

        return createdAt
    }
    getCreatedAt() {
        return this._createdAt
    }

    setTotal() {
        if (this._total) {
            return this._total;
        }
        return this._items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    }




    getTotal() {
        return this._total
    }

}
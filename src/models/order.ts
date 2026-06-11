import { OrderItem } from "@/types/orderItem";
import { orderStatus } from "@/types/orderStatus";
import { FieldValue, Timestamp } from "firebase/firestore";





export class Order {
    private _id: string
    private _customerId: string
    private _items: OrderItem[]
    private _status: orderStatus
    private _createdAt: Timestamp | FieldValue
    constructor(id: string, customerId: string, items: OrderItem[], createdAt: Timestamp | FieldValue, status: orderStatus) {
        this._id = this.setId(id)
        this._customerId = this.setCustomerId(customerId)
        this._items = this.setItems(items)
        this._status = this.setStatus(status)
        this._createdAt = this.setCreatedAt(createdAt)
    }

    setId(id: string) {

        if (!id || id.trim().length === 0) {
            throw new Error("Id is empty")
        }
        return id
    }

    getId() {
        return this._id
    }


    setCustomerId(customerId: string) {
        if (!customerId || customerId.trim().length === 0) {
            throw new Error("Customer Id is empty")
        }
        return customerId
    }
    getCustomerId() {
        return this._customerId
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


    setCreatedAt(createdAt: Timestamp | FieldValue) {
        if (!createdAt) {
            throw new Error("CreatedAt is null")
        }

        return createdAt
    }
    getCreatedAt() {
        return this._createdAt
    }



}
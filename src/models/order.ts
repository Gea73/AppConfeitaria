import { Timestamp } from "firebase/firestore";

type orderStatus = "pending" | "preparing" | "delivered";

export class Order {
    private _id?: string
    private _customerId: string
    private _items: object
    private _status: orderStatus
    private _createdAt: Timestamp
    constructor(customerId: string, items: object, status: orderStatus, createdAt: Timestamp, id?: string) {
        this._id = id
        this._customerId = this.setCustomerId(customerId)
        this._items = this.setItems(items)
        this._status = this.setStatus(status)
        this._createdAt = this.setCreatedAt(createdAt)
    }

    setId(id: string) {
        if (this._id) {
            throw new Error("Id already assigned")
        }
        if (!id || id.trim().length === 0) {
            throw new Error("Id is empty")
        }
        this._id = id
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

    setItems(items: object) {
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
        return this._status
    }


    setCreatedAt(createdAt: Timestamp) {
        if (!createdAt) {
            throw new Error("CreatedAt is null")
        }

        return createdAt
    }
    getCreatedAt() {
        return this._createdAt
    }



}
import { Timestamp } from "firebase/firestore"

export class User {
     private _id?: string
    private _name: string
    private _email: string
    private _createdAt: Timestamp
    constructor(name: string, email: string, createdAt: Timestamp,id?: string) {
         this._id = id
        this._name = this.setName(name)
        this._email = this.setEmail(email)
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


    setName(name: string) {
        if (!name || name.trim().length === 0) {
            throw new Error("Name is empty")
        }
        if (name.length > 40) {
            throw new Error("Name is too long (40 characters)")
        }
        return name
    }
    getName() {
        return this._name
    }

    setEmail(email: string) {
        if (!email || email.trim().length === 0) {
            throw new Error("Email is empty")
        }
        if (email.length > 40) {
            throw new Error("Email is too long (40 characters)")
        }
        if (!email.includes("@")) {
            throw new Error("Email doesn't have @")
        }
        return email
    }
    getEmail() {
        return this._email
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
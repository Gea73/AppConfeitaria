import { FieldValue, Timestamp } from "firebase/firestore";
type roles = "user" | "admin";
export class User {
    private _id: string
    private _name: string
    private _email: string
    private _createdAt: Timestamp | FieldValue
    private _role: roles
    constructor(id: string, name: string, email: string, createdAt: Timestamp | FieldValue, role: roles) {
        this._id = this.setId(id)
        this._name = this.setName(name)
        this._email = this.setEmail(email)
        this._createdAt = this.setCreatedAt(createdAt)
        this._role = this._role = this.setRole(role)
    }

    setId(id: string) {

        if (!id || id.trim().length === 0) {
            throw new Error("Id is empty")
        }
        return id;
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

    setCreatedAt(createdAt: Timestamp | FieldValue) {
        if (!createdAt) {
            throw new Error("CreatedAt is null")
        }

        return createdAt
    }
    getCreatedAt() {
        return this._createdAt
    }
    setRole(role: roles) {
        if (!role) {
            throw new Error("Role is null")
        }

        return role
    }
    getRole() {
        return this._role
    }

}
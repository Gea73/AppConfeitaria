type Role = "user" | "admin";
export class User {
    private _id: string
    private _name: string
    private _email: string
    private _role: Role
    constructor(id: string, name: string, email: string, role: Role,) {
        this._id = this.setId(id)
        this._name = this.setName(name)
        this._email = this.setEmail(email)
        this._role = this.setRole(role)
    }

    setId(id: string) {

        if (!id || id.trim().length === 0) {
            throw new Error("Id is empty")
        }
        return id;
    }

    getId():string {

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


    setRole(role: Role) {
        if (!role) {
            throw new Error("Role is null")
        }

        return role
    }
    getRole() {
        return this._role
    }

}
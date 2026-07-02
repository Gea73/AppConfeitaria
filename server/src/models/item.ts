
export class Item {
    private _id: string
    private _name: string
    private _description: string
    private _price: number
    private _imageUrl: string
  
    constructor(id: string,name: string, description: string, price: number, imageUrl: string, ) {
        this._id = this.setId(id)
        this._name = this.setName(name)
        this._description = this.setDescription(description)
        this._price = this.setPrice(price)
        this._imageUrl = this.setImageUrl(imageUrl)
       
    }

    setId(id: string) {
        if (!id || id.trim().length === 0) {
            throw new Error("Id is empty")
        }
        return id
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

    setDescription(description: string) {
        if (!description || description.trim().length === 0) {
            throw new Error("Description empty")
        }
        if (description.length > 300) {
            throw new Error("Description is too long (300 characters)")
        }
        return description
    }
    getDescription() {
        return this._description
    }

    setPrice(price: number) {
        if (!price) {
            throw new Error("Price is null")
        }
        if (price <= 0) {
            throw new Error("Price is less or equal to zero")
        }
        return price
    }
    getPrice() {
        return this._price
    }

    setImageUrl(imageUrl: string) {
        if (!imageUrl || imageUrl.trim().length === 0) {
            throw new Error("ImageUrl is empty")
        }
        if (imageUrl.length > 2100) {
            throw new Error("ImageUrl is too long (2100 characters)")
        }
        return imageUrl
    }
    getImageUrl() {
        return this._imageUrl
    }




}
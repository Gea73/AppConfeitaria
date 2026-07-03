
import { Order } from "@/models/order";
import { OrderItem } from "@/types/orderItem";
import { OrderStatus } from "@/types/orderStatus";
const API_URL = process.env.EXPO_PUBLIC_API_URL

export const orderService = {

    createOrder: async function (customerId: string, items: OrderItem[], status: OrderStatus): Promise<void> {
        try {


            const response = await fetch(`${API_URL}/order/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customerId: customerId, items: items, status: status })
            })

            if (!response.ok) {
                throw new Error("Order couldn't be created")
            }


        } catch (error) {
            throw new Error("Order couldn't be created", {
                cause: error
            })
        }
    },

    updateOrder: async function (orderId: string, items: OrderItem[] | null, status: string | null): Promise<void> {
        try {

            const response = await fetch(`${API_URL}/order/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, status })
            })

            if (!response.ok) {
                throw new Error("Order couldn't be updated")
            }


        } catch (error) {
            throw new Error("Order couldn't be updated", {
                cause: error
            })
        }

    },
    getOrder: async function (orderId: string): Promise<Order | null> {
        try {

            const response = await fetch(`${API_URL}/order/${orderId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("Order couldn't be fetched")
            }
            const data = await response.json()

            if (!data) {
                return null
            }

            return new Order(data?.customerId, data?.items, data?.status, data.id, data.total)


        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }
    },
    getOrders: async function (customerId: string): Promise<Order[] | null> {
        try {

            const response = await fetch(`${API_URL}/order/customer/${customerId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("Orders couldn't be fetched")
            }
            const data = await response.json()

            if (!data) {
                return null
            }

            const orders = data?.map((o: any) => { return new Order(o.customerId, o.items, o.status, o.id, o.total) })
            return orders

        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }

    },
    getAllOrders: async function (): Promise<Order[] | null> {
        try {
            console.log("1 - Starting fetch");
            const response = await fetch(`${API_URL}/order/all`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            })

            console.log("2 - Response received", response.status);

            if (!response.ok) {
                throw new Error("Orders couldn't be fetched")
            }
            const data = await response.json()

            console.log("3 - JSON parsed", data);
            if (!data) {
                return null
            }

            const orders = data?.map((o: any) => {
                console.log("Creating order", o);
                return new Order(o.customerId, o.items, o.status, o.id, o.total)
            })
            console.log("4 - Orders created");

                console.log("5 - returning orders");
            return orders
        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }

    },

    deleteOrder: async function (orderId: string): Promise<void> {
        try {

            const response = await fetch(`${API_URL}/order/${orderId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },

            })

            if (!response.ok) {
                throw new Error("Order couldn't be deleted")
            }

        } catch (error) {
            throw new Error("Order couldn't be deleted", {
                cause: error
            })
        }
    },


}

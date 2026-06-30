/*
import { Order } from "@/models/order";
import { OrderItem } from "@/types/orderItem";
import { OrderStatus } from "@/types/orderStatus";


export const orderService = {

    createOrder: async function (customerId: string, items: OrderItem[], status: OrderStatus): Promise<void> {
        try {
            const order = new Order(customerId, items, status);
            await orderRepo.createOrder(order);

        } catch (error) {
            throw new Error("Order couldn't be created", {
                cause: error
            })
        }
    },

    updateOrder: async function (orderId: string, items: OrderItem[] | null, status: string | null): Promise<void> {
        try {

            await orderRepo.updateOrder(orderId, status, items)

        } catch (error) {
            throw new Error("Order couldn't be updated", {
                cause: error
            })
        }

    },
    getOrder: async function (orderId: string): Promise<Order | null> {
        try {

            const data = await orderRepo.getOrderById(orderId);

            if (!data) {
                return null
            }

            return new Order(data?.customerUid, data?.items, data?.status, data.uid)


        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }
    },
    getOrders: async function (customerId: string): Promise<Order[] | null> {
        try {

            const data = await orderRepo.getOrdersByCustomer(customerId);
            if (!data) {
                return null
            }

            const orders = data?.map((o) => { return new Order(o.customerUid, o.items, o.status, o.uid) })
            return orders

        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }

    },
    getAllOrders: async function (): Promise<Order[] | null> {
        try {
            const data = await orderRepo.getOrders()

            if (!data) {
                return null
            }

            const orders = data?.map((o) => { return new Order(o.customerUid, o.items, o.status, o.uid) })

            return orders
        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }

    },

    deleteOrder: async function (orderId: string): Promise<void> {
        try {

            await orderRepo.deleteOrder(orderId)

        } catch (error) {
            throw new Error("Order couldn't be deleted", {
                cause: error
            })
        }
    },

    subscribeToAllOrders: function (callback: (orders: Order[]) => void) {
        try {
            return onSnapshot(collection(db, "orders"), (snapshot) => {
                const orders = snapshot.docs.map((doc) => {
                    const data = doc.data()
                    return new Order(data.customerId, data.items, data.status, doc.id)
                })
                callback(orders)
            })

        } catch (error) {
            throw new Error("It was not possible to subscribe to orders", {
                cause: error
            })
        }
    },
    subscribeToCustomerOrders: function (customerId: string, callback: (orders: Order[]) => void) {
        try {


            const q = query(collection(db, "orders"), where("customerId", "==", customerId),orderBy("createdAt","desc"));

            return onSnapshot(q, (snapshot) => {
                const orders = snapshot.docs.map((doc) => {
                    const data = doc.data()
                    return new Order(data.customerId, data.items, data.status, doc.id)
                })
                callback(orders)
            })
        } catch (error) {
            throw new Error("It was not possible to subscribe to customer orders", {
                cause: error
            })
        }
    }
}
    */
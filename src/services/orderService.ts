import { db } from "@/firebase/firebaseConfig";
import { Order } from "@/models/order";
import { orderRepo } from "@/repositories/orderRepo";
import { OrderItem } from "@/types/orderItem";
import { OrderStatus } from "@/types/orderStatus";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const orderService = {

    createOrder: async function (customerId: string, items: OrderItem[], status: OrderStatus) {
        try {
            const order = new Order(customerId, items, status);
            const data = await orderRepo.createOrder(order);
            if (!data) {
                throw new Error("Order couldn't be created")
            }
            order.setUid(data.uid)
            order.setCreatedAt(data.createdAt)

            return order;

        } catch (error) {
            throw new Error("Order couldn't be created", {
                cause: error
            })
        }
    },

    updateOrder: async function (orderId: string, items: OrderItem[] | null, status: string | null) {
        try {

            await orderRepo.updateOrder(orderId, status, items)

        } catch (error) {
            throw new Error("Order couldn't be updated", {
                cause: error
            })
        }

    },
    getOrder: async function (orderId: string | null): Promise<Order | null> {
        try {
            if (orderId) {
                const data = await orderRepo.getOrderById(orderId);
                if (!data) {
                    throw new Error("Order couldn't be fetched")
                }
                const order = new Order(data?.customerId, data?.items, data?.status, orderId, data?.createdAt)
                return order
            }

            return null
        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }
    },
    getOrders: async function (customerId: string | null): Promise<Order[] | null> {
        try {
            if (customerId) {
                const data = await orderRepo.getOrdersByCustomer(customerId);
                if (!data) {
                    throw new Error("Order couldn't be fetched")
                }

                const orders = data?.map((o) => { return new Order(o.customerId, o.items, o.status, o.uid, o.createdAt) })
                if (!orders) {
                    throw new Error("Order couldn't be fetched")
                }

                return orders
            }
            return null
        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }

    },
    getAllOrders: async function () {
        try {
            const data = await orderRepo.getOrders()
            if (!data) {
                throw new Error("Order couldn't be fetched")
            }
            const orders = data?.map((o) => { return new Order(o.customerId, o.items, o.status, o.uid, o.createdAt) })
            if (!orders) {
                throw new Error("Order couldn't be fetched")
            }
            return orders
        } catch (error) {
            throw new Error("Order couldn't be fetched", {
                cause: error
            })
        }

    },
    deleteOrder: async function (orderId: string) {
        try {
            await orderRepo.deleteOrder(orderId)
        } catch (error) {
            throw new Error("Order couldn't be deleted", {
                cause: error
            })
        }
    },
    subscribeToAllOrders: function (callback: (orders: Order[]) => void) {
        return onSnapshot(collection(db, "orders"), (snapshot) => {
            const items = snapshot.docs.map((doc) => {
                const data = doc.data()
                return new Order(data.customerId, data.items, data.status, doc.id, data.createdAt)
            })
            callback(items)
        })

    },
    subscribeToCustomerOrders: function (customerId: string, callback: (orders: Order[]) => void) {

        const q = query(collection(db, "orders"), where("customerId", "==", customerId));


        return onSnapshot(q, (snapshot) => {
            const orders = snapshot.docs.map((doc) => {
                const data = doc.data()
                return new Order(data.customerId, data.items, data.status, doc.id, data.createdAt)
            })
            callback(orders)
        })
    }

}
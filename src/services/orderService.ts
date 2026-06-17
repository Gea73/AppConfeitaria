import { db } from "@/firebase/firebaseConfig";
import { Order } from "@/models/order";
import { orderRepo } from "@/repositories/orderRepo";
import { OrderItem } from "@/types/orderItem";
import { orderStatus } from "@/types/orderStatus";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const orderService = {

    createOrder: async function (customerId: string, items: OrderItem[], status: orderStatus) {
        try {
            const order = new Order(customerId, items, status);
            const data = await orderRepo.createOrder(order);
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
        let data = null;
        if (orderId) {
            data = await orderRepo.getOrderById(orderId);
            const order = new Order(data?.customerId, data?.items, data?.status, orderId, data?.createdAt)
            return order
        }

        return null

    },
    getOrders: async function (customerId: string | null): Promise<Order[] | null> {

        if (customerId) {
            const data = await orderRepo.getOrdersByCustomer(customerId);
            const orders = data?.map((o) => { return new Order(o.customerId, o.items, o.status, o.uid, o.createdAt) })
            if (orders) {
                return orders
            }

        }
        return null
    },
    getAllOrders: async function () {
        const data = await orderRepo.getOrders()
        const orders = data?.map((o) => { return new Order(o.customerId, o.items, o.status, o.uid, o.createdAt) })
        if (orders) {
            return orders
        }
    },
    deleteOrder: async function (orderId: string) {
        await orderRepo.deleteOrder(orderId)
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
    subscribeToOrders: function (customerId: string, callback: (orders: Order[]) => void) {

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
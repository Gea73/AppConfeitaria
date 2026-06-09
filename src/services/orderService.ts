import { Order } from "@/models/order";
import { orderRepo } from "@/repositories/orderRepo";
import { OrderItem } from "@/types/ordemItem";

export const orderService = {

    createOrder: async function (customerId: string, items: OrderItem[]) {
        try {

            const data = await orderRepo.createOrder(customerId, items);

            const order = new Order(data.id, customerId, items, data.createdAt);
            return order;

        } catch (error) {
            throw new Error("Order couldn't be created", {
                cause: error
            })
        }
    },
    updateOrder: async function (orderId: string, items: object | null, status: string | null) {
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
            const order = new Order(orderId, data?.customerId, data?.items, data?.createdAt)
            return order
        }

        return null

    },
    getOrders: async function (customerId: string | null): Promise<Order[] | null> {

        if (customerId) {
           const data = await orderRepo.getOrdersByCustomer(customerId);
            const orders = data?.map((o) => { return new Order(o.uid, o.customerId, o.items, o.createdAt) })
            if (orders) {
                return orders
            }

        }
        return null
    },
    deleteOrder: async function (orderId: string) {
        await orderRepo.deleteOrder(orderId)
    }

}
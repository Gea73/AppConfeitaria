import { Order } from "@/models/order";
import { orderRepo } from "@/repositories/orderRepo";

export const orderService = {

    createOrder: async function (customerId: string, items: object) {
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

            if (items) {
                await orderRepo.updateOrderItems(orderId, items);
            }
            if (status) {
                await orderRepo.updateOrderStatus(orderId, status);
            }
        } catch (error) {
            throw new Error("Order couldn't be updated", {
                cause: error
            })
        }

    },
    getOrder: async function (orderId: string | null, customerId: string | null) {
        if (orderId) {
            await orderRepo.getOrderById(orderId);
        }
        if (customerId) {
            await orderRepo.getOrdersByCustomer(customerId);
        }
    },
    deleteOrder: async function (orderId: string) {
        await orderRepo.deleteOrder(orderId)
    }

}
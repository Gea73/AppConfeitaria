import { Order } from "../models/order.js";
import { OrderItem } from "../types/orderItem.js";
import { OrderRecord } from "../types/orderRecord.js";
import mssql from "mssql";
import pool from "../config/db.js";

export const orderRepo = {
    createOrder: async function (order: Order): Promise<void> {
        try {

            pool
                .request()
                .input("id", mssql.UniqueIdentifier, order.getUid())
                .input("customerId", mssql.UniqueIdentifier, order.getCustomerUid())
                .input("status", mssql.VarChar, order.getStatus())
                .input("total", mssql.Decimal, order.getTotal())
                .query(
                    `INSERT INTO ASUAESCOLHA.ORDERS (ID,CUSTOMERID,STATUS,TOTAL,CREATEDAT) VALUES (@id,@customerId,@status,@total,GETDATE())`,
                );

        } catch (error) {
            throw error
        }
    },


    updateOrder: async function (id: string, status: string | null, items: OrderItem[] | null): Promise<void> {
        try {




        } catch (error) {
            throw error
        }

    }

    ,
    getOrderById: async function (id: string): Promise<OrderRecord | null> {
        try {
            const result = await
                pool
                    .request()
                    .input("ID", mssql.UniqueIdentifier, id).query(`SELECT ID,CUSTOMERID,STATUS,TOTAL,CREATEDAT FROM ASUAESCOLHA.ORDERS WHERE ID = @id`)

            const data = result.recordset[0]

            const resultItems = await pool.request().input("ID", mssql.UniqueIdentifier, id).query(`SELECT i.ID,i.NAME,i.DESCRIPTION,i.PRICE,i.IMAGEURL,i.CREATEDAT FROM ASUAESCOLHA.ITEMS i INNER JOIN ASUAESCOLHA.MOVEMENT mov ON mov.ITEMID = i.ID WHERE mov.ORDERID = @id`)

            const items = resultItems.recordset

            return {
                uid: data.ID,
                customerUid: data.CUSTOMERID,
                status: data.STATUS,
                total: data.TOTAL,
                items: items,
                createdAt: data.CREATEDAT
            }

        } catch (error) {
            throw error
        }
    },

    getOrdersByCustomer: async function (customerId: string): Promise<OrderRecord[] | null> {
        try {
            const result = await
                pool
                    .request()
                    .input("CUSTOMERID", mssql.UniqueIdentifier, customerId).query(`SELECT ID,CUSTOMERID,STATUS,TOTAL,CREATEDAT FROM ASUAESCOLHA.ORDERS WHERE ID = @customerId`)

            const orders = result.recordset
            orders.forEach(async (order) => {

                const resultItems = await pool.request().input("ID", mssql.UniqueIdentifier, order.ID).query(`SELECT i.ID,i.NAME,i.DESCRIPTION,i.PRICE,i.IMAGEURL,i.CREATEDAT FROM ASUAESCOLHA.ITEMS i INNER JOIN ASUAESCOLHA.MOVEMENT mov ON mov.ITEMID = i.ID WHERE mov.ORDERID = @id`)
                order = { ...order, item: resultItems }
            })

            return orders

        } catch (error) {
            throw error
        }
    },


    getOrders: async function (): Promise<OrderRecord[] | null> {
        try {

            const result = await
                pool
                    .request()
                    .query(`SELECT ID,CUSTOMERID,STATUS,TOTAL,CREATEDAT FROM ASUAESCOLHA.ORDERS`)

            const orders = result.recordset
            orders.forEach(async (order) => {

                const resultItems = await pool.request().input("ID", mssql.UniqueIdentifier, order.ID).query(`SELECT i.ID,i.NAME,i.DESCRIPTION,i.PRICE,i.IMAGEURL,i.CREATEDAT FROM ASUAESCOLHA.ITEMS i INNER JOIN ASUAESCOLHA.MOVEMENT mov ON mov.ITEMID = i.ID WHERE mov.ORDERID = @id`)
                order = { ...order, item: resultItems }
            })

            return orders

        } catch (error) {
            throw error
        }
    },

    deleteOrder: async function (id: string): Promise<void> {
        try {
            await
                pool
                    .request()
                    .input("ID", mssql.UniqueIdentifier, id).query(`DELETE FROM ASUAESCOLHA.ORDERS WHERE ID = @id`)


        } catch (error) {
            throw error
        }
    }
}
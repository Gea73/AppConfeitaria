import { Order } from "../models/order.js";
import { OrderItem } from "../types/orderItem.js";
import { OrderRecord } from "../types/orderRecord.js";
import mssql from "mssql";
import pool from "../config/db.js";
import { v7 as uuidv7 } from "uuid";

export const orderRepo = {
    createOrder: async function (order: Order): Promise<void> {
        const transaction = new mssql.Transaction(pool)
        let started = false
        try {


            await transaction.begin()
            started = true
            await transaction
                .request()
                .input("id", mssql.UniqueIdentifier, order.getId())
                .input("customerId", mssql.UniqueIdentifier, order.getCustomerId())
                .input("status", mssql.VarChar, order.getStatus())
                .input("total", mssql.Decimal, order.getTotal())
                .query(
                    `INSERT INTO ASUAESCOLHA.ORDERS (ID,CUSTOMERID,STATUS,TOTAL,CREATEDAT) VALUES (@id,@customerId,@status,@total,GETDATE())`,
                );

            for (const item of order.getItems()) {
                await transaction.request()
                    .input("id", mssql.UniqueIdentifier, uuidv7())
                    .input("orderId", mssql.UniqueIdentifier, order.getId())
                    .input("itemId", mssql.UniqueIdentifier, item.id)
                    .input("quantity", mssql.Int, item.quantity)
                    .query(`
            INSERT INTO ASUAESCOLHA.MOVEMENT
            (ID,ORDERID, ITEMID, QUANTITY)
            VALUES (@id,@orderId,@itemId,@quantity)
        `);
            }

            await transaction.commit()


        } catch (error) {
            if (started) {
                await transaction.rollback()
            }

            throw error
        }
    },
    createMov: async function (id: string, orderId: string, itemId: string, quantity: number) {
        try {
            await pool.request()
                .input("id", mssql.UniqueIdentifier, id)
                .input("orderId", mssql.UniqueIdentifier, orderId)
                .input("itemId", mssql.UniqueIdentifier, itemId)
                .input("quantity", mssql.Int, quantity)
                .query(`
            INSERT INTO ASUAESCOLHA.MOVEMENT
            (ID,ORDERID, ITEMID, QUANTITY)
            VALUES (@id,@orderId,@itemId,@quantity)
        `);
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
                    .input("id", mssql.UniqueIdentifier, id).query(`SELECT ID AS id,CUSTOMERID AS customerId,STATUS AS status,TOTAL AS total,CREATEDAT AS createdAt FROM ASUAESCOLHA.ORDERS WHERE ID = @id`)

            const data = result.recordset[0]

            const resultItems = await pool.request().input("id", mssql.UniqueIdentifier, id).query(`SELECT i.ID AS id,i.NAME AS name,i.DESCRIPTION AS description,i.PRICE AS price,i.IMAGEURL AS imageUrl,mov.QUANTITY AS quantity FROM ASUAESCOLHA.ITEMS i INNER JOIN ASUAESCOLHA.MOVEMENT mov ON mov.ITEMID = i.ID WHERE mov.ORDERID = @id`)

            const items = resultItems.recordset

            if (!data || !resultItems || !items) {
                return null
            }


            return {
                id: data.ID,
                customerId: data.CUSTOMERID,
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
                    .input("customerId", mssql.UniqueIdentifier, customerId).query(`SELECT ID AS id,CUSTOMERID AS customerId,STATUS AS status,TOTAL AS total,CREATEDAT AS createdAt FROM ASUAESCOLHA.ORDERS WHERE CUSTOMERID = @customerId`)

            const orders = result.recordset
            const orderWithItems = await Promise.all(orders.map(async (order) => {
                const resultItems = await pool.request().input("id", mssql.UniqueIdentifier, order.id).query(`SELECT i.ID AS id,i.NAME AS name,i.DESCRIPTION AS description,i.PRICE AS price,i.IMAGEURL AS imageUrl,mov.QUANTITY AS quantity FROM ASUAESCOLHA.ITEMS i INNER JOIN ASUAESCOLHA.MOVEMENT mov ON mov.ITEMID = i.ID WHERE mov.ORDERID = @id`)
                return { ...order, items: resultItems.recordset }
            }))

            return orderWithItems

        } catch (error) {
            throw error
        }
    },


    getOrders: async function (): Promise<OrderRecord[] | null> {
        try {

            const result = await
                pool
                    .request()
                    .query(`SELECT ID AS id,CUSTOMERID AS customerId,STATUS AS status,TOTAL AS total,CREATEDAT AS createdAt FROM ASUAESCOLHA.ORDERS`)

            const orders = result.recordset

            const ordersWithItems = await Promise.all(orders.map(async (order) => {
                const resultItems = await pool.request().input("id", mssql.UniqueIdentifier, order.id).query(`SELECT i.ID,i.NAME,i.DESCRIPTION,i.PRICE,i.IMAGEURL,mov.QUANTITY FROM ASUAESCOLHA.ITEMS i INNER JOIN ASUAESCOLHA.MOVEMENT mov ON mov.ITEMID = i.ID WHERE mov.ORDERID = @id`)
                return { ...order, items: resultItems.recordset }

            }))

            return ordersWithItems

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
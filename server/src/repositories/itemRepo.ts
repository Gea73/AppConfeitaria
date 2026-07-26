import mssql from "mssql";
import pool from "../config/db.js";
import { Item } from "../models/item.js";
import { ItemRecord } from "../types/itemRecord.js";

export const itemRepo = {

    createItem: async function (item: Item): Promise<void> {
        try {
            await pool
                .request()
                .input("id", mssql.UniqueIdentifier, item.getId())
                .input("name", mssql.VarChar, item.getName())
                .input("description", mssql.VarChar, item.getDescription())
                .input("price", mssql.Decimal, item.getPrice())
                .input("imageUrl", mssql.VarChar, item.getImageUrl())
                .query(
                    `INSERT INTO ASUAESCOLHA.ITEMS (ID,NAME,DESCRIPTION,PRICE,IMAGEURL,CREATEDAT) VALUES (@id,@name,@description,@price,@imageUrl,GETDATE())`,
                );



        } catch (error) {
            throw error
        }
    },

    getItemByName: async function (name: string): Promise<ItemRecord | null> {
        try {
            const result = await
                pool
                    .request()
                    .input("name", mssql.VarChar, name).query(`SELECT ID,NAME,DESCRIPTION,PRICE,IMAGEURL,CREATEDAT FROM ASUAESCOLHA.ITEMS WHERE NAME = @name`)

            const data = result.recordset[0]

            if (!data) {
                return null
            }

            return {
                id: data.ID,
                name: data.NAME,
                description: data.DESCRIPTION,
                price: data.PRICE,
                imageUrl: data.IMAGEURL,
                createdAt: data.CREATEDAT
            }
        } catch (error) {
            throw error
        }
    },

    getItemById: async function (id: string): Promise<ItemRecord | null> {
        try {
            const result = await
                pool
                    .request()
                    .input("id", mssql.UniqueIdentifier, id).query(`SELECT ID,NAME,DESCRIPTION,PRICE,IMAGEURL,CREATEDAT FROM ASUAESCOLHA.ITEMS WHERE ID = @id`)

            const data = result.recordset[0]

            if (!data) {
                return null
            }

            return {
                id: data.ID,
                name: data.NAME,
                description: data.DESCRIPTION,
                price: data.PRICE,
                imageUrl: data.IMAGEURL,
                createdAt: data.CREATEDAT
            }

        } catch (error) {
            throw error
        }
    },

    getItems: async function (): Promise<ItemRecord[] | null> {
        try {

            const result = await
                pool
                    .request().query(`SELECT ID AS id,NAME AS name,DESCRIPTION AS description,PRICE AS price,IMAGEURL AS imageUrl,CREATEDAT AS createdAt FROM ASUAESCOLHA.ITEMS`)

            return result.recordset

        } catch (error) {
            throw error
        }
    },
    updateItem: async function (id: string, name: string | null, description: string | null, price: number | null, imageUrl: string | null): Promise<void> {
        try {
            const req = pool.request().input("id", mssql.UniqueIdentifier, id)
            const updates: string[] = []
            if (name) {
                req.input("name", mssql.VarChar, name);
                updates.push("NAME=@name")
            }
            if (description) {
                req.input("description", mssql.VarChar, description);
                updates.push("DESCRIPTION=@description")
            }
            if (price) {
                req.input("price", mssql.Decimal, price);
                updates.push("PRICE=@price")
            }
            if (imageUrl) {
                req.input("imageUrl", mssql.VarChar, imageUrl);
                updates.push("IMAGEURL=@imageUrl")
            }
            if (!updates.length) return
            await
                req.query(`UPDATE ASUAESCOLHA.ITEMS SET ${updates.join(",")} WHERE ID = @id`)

        } catch (error) {
            throw error
        }


    },


    deleteItem: async function (id: string): Promise<void> {
        try {
            await
                pool
                    .request()
                    .input("id", mssql.UniqueIdentifier, id).query(`DELETE FROM ASUAESCOLHA.ITEMS WHERE ID = @id`)


        } catch (error) {
            throw error
        }
    }

}
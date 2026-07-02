import mssql from "mssql";
import pool from "../config/db.js";
import { User } from "../models/user.js";
import { UserRecord } from "../types/userRecord.js";

export const userRepo = {
  createUser: async function (user: User, password_hash: string) {
    try {

      await pool
        .request()
        .input("id", mssql.UniqueIdentifier, user.getUid())
        .input("name", mssql.VarChar, user.getName())
        .input("email", mssql.VarChar, user.getEmail())
        .input("password_hash", mssql.VarChar, password_hash)
        .input("role", mssql.VarChar, user.getRole())
        .query(
          `INSERT INTO ASUAESCOLHA.USERS (ID,NAME,PASSWORD_HASH,EMAIL,ROLE,CREATEDAT) VALUES (@id,@name,@password_hash,@email,@role,GETDATE())`,
        );

    } catch (error) {
      throw error
    }
  },


  getUserById: async function (id: string): Promise<UserRecord | null> {
    try {
      const result = await
        pool
          .request()
          .input("id", mssql.UniqueIdentifier, id).query(`SELECT ID,NAME,EMAIL,ROLE,CREATEDAT FROM ASUAESCOLHA.USERS WHERE ID = @id`)


      const data = result.recordset[0]

      if (!data) {
        return null
      }

      return { uid: data.ID, name: data.NAME, email: data.EMAIL, role: data.ROLE, createdAt: data.CREATEDAT }

    } catch (error) {
      throw error
    }
  },
  getUserByEmail: async function (email: string) {
    try {
      const result = await
        pool
          .request()
          .input("email", mssql.VarChar, email).query(`SELECT ID,NAME,EMAIL,ROLE,CREATEDAT FROM ASUAESCOLHA.USERS WHERE EMAIL = @email`)

      const data = result.recordset[0]

      if (!data) {
        return null
      }

      return { uid: data.ID, name: data.NAME, email: data.EMAIL, role: data.ROLE, createdAt: data.CREATEDAT }

    } catch (error) {
      throw error
    }
  },
  getUserPassword: async function (id: string) {
    try {
      const result = await pool.request().input("id", mssql.UniqueIdentifier, id).query(`SELECT PASSWORD_HASH FROM ASUAESCOLHA.USERS WHERE ID = @id`)
      const data = result.recordset[0]

      if (!data) {
        return null
      }

      return data.PASSWORD_HASH
    } catch (error) {
      throw error
    }
  }
}
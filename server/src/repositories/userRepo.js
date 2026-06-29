import mssql from "mssql";
import pool from "../config/db.js";

export const userRepo = {
  createUser: async function (id, name, password_hash, email, role) {
    pool
      .request()
      .input("id", mssql.UniqueIdentifier, id)
      .input("name", mssql.VarChar, name)
      .input("email", mssql.VarChar, email)
      .input("password_hash", mssql.VarChar, password_hash)
      .input("role", mssql.VarChar, role)
      .query(
        `INSERT INTO ASUAESCOLHA.USERS (ID,NAME,PASSWORD_HASH,EMAIL,ROLE,CREATEDAT) VALUES (@id,@name,@password_hash,@email,@role,GETDATE())`,
      );
  },
};

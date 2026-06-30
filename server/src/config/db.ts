import dotenv from "dotenv";
import mssql from "mssql";
dotenv.config();


if (!process.env.DB_USER || !process.env.DB_PWD || !process.env.DB_SERVER || !process.env.DB_NAME) {
  throw new Error("Invalid enviromental variables")
}


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedConnection: false,
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    instanceName: "SQLEXPRESS",
  },
  port: 1433,
};

const pool = await mssql.connect(config);

export default pool;

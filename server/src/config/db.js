import dotenv from "dotenv";
import mssql from "mssql";
dotenv.config();

console.log(process.env.DB_USER);
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: "ANA\\SQLEXPRESS",
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

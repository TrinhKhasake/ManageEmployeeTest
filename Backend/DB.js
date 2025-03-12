import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const sslConfig = process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: sslConfig
});

pool.connect().catch((err) => {
  console.error("Database connection error:", err);
});

export default pool;

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "34.81.89.236",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "cuoi08",
  port: process.env.DB_PORT || 5432
});

pool.connect().catch((err) => {
  console.error("Database connection error:", err);
});

export default pool;

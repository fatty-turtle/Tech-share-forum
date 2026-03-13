import dotenv from "dotenv";
import mysql from "mysql2/promise";
import tables from "./db.tables.js";

dotenv.config();

let pool;

/**
 * Sets up database tables by executing SQL queries from the tables array
 * @param {import('mysql2/promise').Pool} pool - MySQL connection pool
 * @returns {Promise<void>}
 */
async function setDB(pool) {
  for (const table of tables) {
    try {
      await pool.query(table.sql);
      console.log(`[Server] Table '${table.name}' built`);
    } catch (err) {
      console.error(
        `[Server] Failed to build table '${table.name}':`,
        err.message,
      );
    } finally {
    }
  }
}

/**
 * Gets the existing database connection pool
 * @returns {import('mysql2/promise').Pool} MySQL connection pool
 * @throws {Error} If database is not initialized
 */
function getPool() {
  if (!pool) {
    throw new Error("[Server] DB not initialized. Call initDB() first.");
  }
  return pool;
}

/**
 * Initializes the database connection and creates the database if it doesn't exist
 * @returns {Promise<import('mysql2/promise').Pool>} MySQL connection pool
 */
async function initDB() {
  try {
    if (pool) return pool;

    // create database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``,
    );
    await connection.end();

    // create pool
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    });

    console.log("[Server] Database connected!");
    return pool;
  } catch (err) {
    console.error("[Server] db init fail", err.message);
    process.exit(1);
  }
}

export { initDB, getPool, setDB };

import { getPool } from "../config/db.config.js";

/**
 * Base repository class providing common CRUD operations for database tables
 */
class BaseRepository {
  /**
   * Creates a new BaseRepository instance
   * @param {string} tableName - Name of the database table
   */
  constructor(tableName) {
    this.tableName = tableName;
    this.pool = getPool();
  }

  /**
   * Retrieves all records from the table with pagination
   * @param {number} limit - Maximum number of records to return
   * @param {number} offset - Number of records to skip
   * @returns {Promise<{total: number, rows: Array}>} Object containing total count and rows
   */
  async findAll(limit, offset) {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`,
      [limit, offset],
    );

    const [[{ total }]] = await this.pool.query(
      `SELECT COUNT(*) AS total FROM ${this.tableName}`,
    );

    return { total, rows };
  }

  /**
   * Finds a single record by ID
   * @param {number} id - Record ID
   * @returns {Promise<Object>} The found record
   * @throws {Error} If record not found
   */
  async findById(id) {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${this.tableName.slice(
        0,
        -1,
      )}_id = ?`,
      [id],
    );

    if (!rows.length) {
      throw new Error(`${this.tableName.slice(0, -1)} not found`);
    }

    return rows[0];
  }

  /**
   * Creates a new record in the table
   * @param {Object} data - Data object with field names as keys
   * @returns {Promise<Object>} Created record with generated ID
   */
  async create(data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => "?").join(", ");

    const [result] = await this.pool.query(
      `INSERT INTO ${this.tableName} (${fields.join(
        ", ",
      )}) VALUES (${placeholders})`,
      values,
    );

    return { id: result.insertId, ...data };
  }

  /**
   * Updates an existing record
   * @param {number} id - Record ID to update
   * @param {Object} data - Data object with fields to update
   * @returns {Promise<boolean>} True if update was successful, false otherwise
   */
  async update(id, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    const [result] = await this.pool.query(
      `UPDATE ${
        this.tableName
      } SET ${setClause}, updated_at = NOW() WHERE ${this.tableName.slice(
        0,
        -1,
      )}_id = ?`,
      [...values, id],
    );

    return result.affectedRows === 1;
  }

  /**
   * Deletes a record from the table
   * @param {number} id - Record ID to delete
   * @returns {Promise<Object|null>} Delete result or null
   */
  async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.tableName} WHERE ${this.tableName.slice(
        0,
        -1,
      )}_id = ?`,
      [id],
    );

    return result[0] || null;
  }
}

export default BaseRepository;

import { getPool, initDB } from "../config/db.config.js";
import { seedAdmin } from "./admin.seed.js";
import { seedAll } from "./major.seed.js";

async function runSeeds() {
  try {
    await initDB();
    const pool = getPool();
    const conn = await pool.getConnection();

    await conn.beginTransaction();

    await seedAdmin(conn);
    await seedAll(conn);
    await conn.commit();
    console.log("[Server] Seeds completed successfully");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

runSeeds();
